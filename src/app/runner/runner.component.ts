import { Component, Input } from '@angular/core';
import { BbmlComment, BbmlItemType, BbmlScreen, BbmlSyntaxTree } from '../shared/ast.model';
import ELK from 'elkjs/lib/elk.bundled.js'
import { findOutgoingNodes } from '../shared/ast.utils';
import { v4 as uuidV4 } from 'uuid';
import { line } from 'd3-shape';
import { RunnerService } from './runner.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

function getBezierCenter({
  sourceX,
  sourceY,
  targetX,
  targetY
}: any): [number, number, number, number] {
  const xOffset = Math.abs(targetX - sourceX) / 2;
  const centerX = targetX < sourceX ? targetX + xOffset : targetX - xOffset;

  const yOffset = Math.abs(targetY - sourceY) / 2;
  const centerY = targetY < sourceY ? targetY + yOffset : targetY - yOffset;

  return [centerX, centerY, xOffset, yOffset];
}

/**
 * Path helper utils.
 * Ref: https://github.com/wbkd/react-flow/blob/main/src/components/Edges/BezierEdge.tsx#L19
 */
export function getBezierPath({
  sourceX,
  sourceY,
  sourcePosition = 'bottom',
  targetX,
  targetY,
  targetPosition = 'top'
}: any): string {
  const leftAndRight = ['left', 'right'];
  const [centerX, centerY] = getBezierCenter({
    sourceX,
    sourceY,
    targetX,
    targetY
  });

  let path = `M${sourceX},${sourceY} C${sourceX},${centerY} ${targetX},${centerY} ${targetX},${targetY}`;

  if (
    leftAndRight.includes(sourcePosition) &&
    leftAndRight.includes(targetPosition)
  ) {
    path = `M${sourceX},${sourceY} C${centerX},${sourceY} ${centerX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(targetPosition)) {
    path = `M${sourceX},${sourceY} C${sourceX},${targetY} ${sourceX},${targetY} ${targetX},${targetY}`;
  } else if (leftAndRight.includes(sourcePosition)) {
    path = `M${sourceX},${sourceY} C${targetX},${sourceY} ${targetX},${sourceY} ${targetX},${targetY}`;
  }

  return path;
}

function computeSVGPath(sections: any[]) {
  if (!sections?.length) {
    return null;
  }

  // Handle bend points that elk gives
  // us separately from drag points
  if (sections[0].bendPoints) {
    const points: any[] = sections
      ? [
        sections[0].startPoint,
        ...(sections[0].bendPoints || ([] as any)),
        sections[0].endPoint
      ]
      : [];

    const pathFn = line()
      .x((d: any) => d.x)
      .y((d: any) => d.y);

    return pathFn(points);
  } else {
    return getBezierPath({
      sourceX: sections[0].startPoint.x,
      sourceY: sections[0].startPoint.y,
      targetX: sections[0].endPoint.x,
      targetY: sections[0].endPoint.y
    });
  }
}

@Component({
  selector: 'bb-runner',
  template: `
    <div class="runner">
      <div class="graph-container" [ngStyle]="{ width: graphSize.width + 'px', height: graphSize.height + 'px' }">
        <svg class="edges" [ngStyle]="{ width: graphSize.width + 'px', height: graphSize.height + 'px' }">
          <defs>
            <marker id="arrowhead" markerWidth="5" markerHeight="6" 
            refX="0" refY="3" orient="auto">
              <polygon points="0 0, 5 3, 0 6" fill="#666" />
            </marker>
          </defs>
          <path *ngFor="let edge of edges" [attr.d]="edge.path"
            stroke="#666" stroke-width="1" fill="transparent" marker-end="url(#arrowhead)"></path>
        </svg>

        <ng-container *ngFor="let v of vertices">
          <div [ngStyle]="{ position: 'absolute', top: v.y + 'px', left: v.x + 'px', width: '220px', height: '340px', 'padding': '10px', 'box-sizing': 'border-box', display: 'flex', 'justify-content': 'center' }">
            <ng-container *ngFor="let item of ast">
              <bb-screen [active]="item.name === activeScreen" [screen]="item" *ngIf="item.type === BbmlItemType.Screen && item.name === v.id"></bb-screen>
            </ng-container>
          </div>
        </ng-container>
      </div>
    </div>
  `,
  styles: [`
    .runner {
      display: flex;
      flex: 1;
      overflow: auto;
    }

    .edges {
      position: relative;
    }

    .runner > * {
      margin: 8px;
    }

    .graph-container {
      position: relative;
    }
  `]
})
export class RunnerComponent {
  @Input() ast?: BbmlSyntaxTree;
  public BbmlItemType = BbmlItemType;
  public vertices: any[] = [];
  public edges: any[] = [];
  public graphSize: { width: number; height: number } = {width: 0, height: 0};
  public activeScreen: string | null = null;
  private destroy$ = new Subject<void>();

  constructor(public runnerService: RunnerService) {
    
  }

  ngOnInit() {
    this.runnerService.activeScreen$
      .pipe(takeUntil(this.destroy$))
      .subscribe((screen: string | null) => {
        this.activeScreen = screen;
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
 
  ngAfterViewInit() {    
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  render() {
    const screens: BbmlScreen[] = (this.ast?.filter((value: BbmlScreen | BbmlComment) => value.type === BbmlItemType.Screen) || []) as BbmlScreen[];

    const elk = new ELK();

    const children = screens?.map((screen: BbmlScreen) => {
      return {
        id: screen.name,
        width: 220,
        height: 340,
        ports: [{
          id: screen.name + '-from',
          properties: {
            'port.index': '0',
            'port.side': 'WEST',
            'port.alignment': 'CENTER'
          }
        }, {
          id: screen.name + '-to',
          properties: {
            'port.index': '1',
            'port.side': 'EAST',
            'port.alignment': 'CENTER'
          }
        }],
        properties: {
          portConstraints: 'FIXED_ORDER'
        }
      }
    });

    const screen_names = screens.map((screen: BbmlScreen) => screen.name);
    const edges = screens?.flatMap((screen: BbmlScreen) => {
      const targets = findOutgoingNodes(screen.items);
      return targets
        .filter((target: string) => screen_names.includes(target))
        .map((target: string)=> {
          return {
            id: uuidV4(),
            source: screen.name,
            target: target,
            fromPort: screen.name + '-from',
            toPort: target + '-to'
          }
        });
    });

    const graph = {
      id: "root",
      layoutOptions: { 
        'elk.algorithm': 'layered',
        'elk.direction': 'RIGHT',
        'org.eclipse.elk.layered.layering.strategy': 'INTERACTIVE',
        'org.eclipse.elk.edgeRouting': 'ORTHOGONAL',
        'elk.layered.unnecessaryBendpoints': 'true',
        'elk.layered.spacing.edgeNodeBetweenLayers': '30',
        'org.eclipse.elk.layered.nodePlacement.bk.fixedAlignment': 'BALANCED',
        'org.eclipse.elk.layered.cycleBreaking.strategy': 'DEPTH_FIRST',
        'org.eclipse.elk.insideSelfLoops.activate': 'true',
        portConstraints: 'FIXED_ORDER',
        separateConnectedComponents: 'true',
        'spacing.componentComponent': '30',
        spacing: '30',
        'spacing.nodeNodeBetweenLayers': '30',
        'elk.padding': '[left=10, top=12, right=10, bottom=12]'
      },
      children,
      edges
    };

    elk.layout(graph)
      .then((g) => {
        this.graphSize = {
          width: g.width || 0,
          height: g.height || 0
        };

        this.vertices = g.children || [];
        const screens = this.vertices.map((v) => v.id);
        if ((!this.activeScreen || !screens.includes(this.activeScreen)) && screens[0]) {
          this.runnerService.activeScreen$.next(screens[0]);
        } else {
          this.runnerService.activeScreen$.next(null);
        }

        const edges_with_geometry = edges.map((e: any) => {
          console.log(e)

          return {
            ...e,
            path: computeSVGPath(e.sections)
          };
        });

        this.edges = edges_with_geometry || [];
      })
      .catch(() => {})
  }
}