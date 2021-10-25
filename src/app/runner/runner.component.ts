import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BbmlItemType, BbmlSyntaxTree } from '../shared/ast.model';
import { Graph } from './graph.utils';
import ELK from 'elkjs/lib/elk.bundled.js'

const dotString = `digraph dbml {
  rankdir=LR;
  graph [fontname="helvetica", fontsize=32, fontcolor="#29235c", bgcolor="transparent"];
  node [penwidth=0, margin=0, fontname="helvetica", fontsize=32, fontcolor="#29235c"];
  edge [fontname="helvetica", fontsize=32, fontcolor="#29235c", color="#29235c"];

}`;

@Component({
  selector: 'bb-runner',
  template: `
    <div class="runner">
      

      <div class="graph-container" #graphContainer>

        <div *ngFor="let v of vertices" [ngStyle]="{ position: 'absolute', top: v.y + 'px', left: v.x + 'px', border: '1px solid red', width: '200px', height: '300px' }">
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

    .runner > * {
      margin: 8px;
    }

    .graph-container {
      height: 100vh;
      width: 100vw;
      border: 1px solid red;
      position: relative;
      overflow: auto;
    }
  `]
})
export class RunnerComponent {
  @Input() ast?: BbmlSyntaxTree;
  public BbmlItemType = BbmlItemType;
  public vertices: any[] = [];

  @ViewChild('graphContainer') graphContainer?: ElementRef;
 
  ngAfterViewInit() {    
    this.render();
  }

  ngOnChanges() {
    this.render();
  }

  render() {

    const elk = new ELK()

    const graph = {
      id: "root",
      layoutOptions: { 'elk.algorithm': 'layered' },
      children: [
        { id: "Profile", width: 200, height: 300 },
        { id: "Main", width: 200, height: 300 },
        { id: "Login", width: 200, height: 300 }
      ],
      edges: [
        { id: "e1", sources: [ "Login" ], targets: [ "Main" ] },
        { id: "e2", sources: [ "Login" ], targets: [ "Profile" ] }
      ]
    }

    elk.layout(graph)
      .then((g) => {
        this.vertices = g.children || [];
      })
      .catch(() => {})
  }
}