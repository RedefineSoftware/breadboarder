import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BbmlComment, BbmlItemType, BbmlScreen, BbmlSyntaxTree } from '../shared/ast.model';
import ELK from 'elkjs/lib/elk.bundled.js'
import { findOutgoingNodes } from '../shared/ast.utils';
import { v4 as uuidV4 } from 'uuid';

@Component({
  selector: 'bb-runner',
  template: `
    <div class="runner">
      <div class="graph-container">
        <!-- <svg class="edges">
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" 
            refX="0" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" />
            </marker>
          </defs>
          <line *ngFor="let edge of edges"
            [attr.x1]="edge.x1" [attr.y1]="edge.y1" [attr.x2]="edge.x2" [attr.y2]="edge.y2" 
            stroke="#000" stroke-width="2" marker-end="url(#arrowhead)"></line>
        </svg> -->

        <div *ngFor="let v of vertices" [ngStyle]="{ position: 'absolute', top: v.y + 'px', left: v.x + 'px', width: '200px', height: '320px' }">
          <ng-container *ngFor="let item of ast">
            <bb-screen [screen]="item" *ngIf="item.type === BbmlItemType.Screen && item.name === v.id"></bb-screen>
          </ng-container>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .runner {
      display: flex;
      flex: 1;
    }

    .edges {
      width: 100%;
      height: 100%;
      position: relative;
    }

    .runner > * {
      margin: 8px;
    }

    .graph-container {
      height: 100vh;
      width: 100vw;
      position: relative;
      overflow: auto;
    }
  `]
})
export class RunnerComponent {
  @Input() ast?: BbmlSyntaxTree;
  public BbmlItemType = BbmlItemType;
  public vertices: any[] = [];
  public edges: any[] = [];
 
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
        width: 200,
        height: 320
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
            sources: [screen.name],
            targets: [target]
          }
        });
    });

    const graph = {
      id: "root",
      layoutOptions: { 'elk.algorithm': 'layered' },
      children,
      edges
    }

    elk.layout(graph)
      .then((g) => {
        this.vertices = g.children || [];

        const edges_with_geometry = edges.map((e) => {
          const [ source_name ] = e.sources;
          const [ source_vertex ] = this.vertices.filter((v) => v.id === source_name);

          const [ target_name ] = e.targets;
          const [ target_vertex ] = this.vertices.filter((v) => v.id === target_name);

          return {
            ...e,
            x1: source_vertex.x + 200,
            y1: source_vertex.y + 160,
            x2: target_vertex.x,
            y2: target_vertex.y
          };
        });

        this.edges = edges_with_geometry || [];
      })
      .catch(() => {})
  }
}