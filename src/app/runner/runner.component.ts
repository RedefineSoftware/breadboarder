import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { BbmlItemType, BbmlSyntaxTree } from '../shared/ast.model';
import { Network, parseDOTNetwork } from 'vis-network/standalone';
import { Graph, Vertex } from './graph.utils';

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

        <div *ngFor="let v of vertices" [ngStyle]="{ position: 'absolute', top: v.posy + 'px', left: v.posx + 'px', border: '1px solid red', width: '200px', height: '300px' }">
          <ng-container *ngFor="let item of ast">
            <bb-screen [screen]="item" *ngIf="item.type === BbmlItemType.Screen && item.name === v.name"></bb-screen>
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
    const g = new Graph();
    g.createVertex('Profile');
    g.createVertex('Main');
    g.createVertex('Login');
    g.createEdge('Main', 'Profile');
    g.createEdge('Login', 'Main');

    const vertices: any[] = [];
    for (let v in g.vertices) {
      vertices.push({
        ...g.vertices[v],
        name: v
      });
    }

    this.vertices = vertices;


    var parsedData = parseDOTNetwork(dotString);




    // const svg = vizRenderStringSync(dotString, {
    //   engine: 'dot',
    //   format: 'svg',
    // });

    // console.log(svg)

    var data = {
      nodes: parsedData.nodes,
      edges: parsedData.edges
    }

    var options = parsedData.options;

    // you can extend the options like a normal JSON variable:
    options.nodes = {
      color: 'red'
    }


    // // create a network
    // var container = this.graphContainer?.nativeElement;

    // // initialize your network!
    // if (container) {
    //   var network = new Network(container, data, options);
    //   console.log(container)
    // }
  }
}