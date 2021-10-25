// heavily inspired by: https://github.com/jackrusher/jssvggraph/blob/master/graph.js

export interface Vertex {
  posx: number;
  posy: number;
  edges: { [k: string]: Edge };
  h: number;
  w: number;
}

export interface Edge {
  dest: string;
}

export class Graph {
  vertices: { [k: string]: Vertex } = {};
  forcex: any = {};
  forcey: any = {};

  repulsion = 200000; // repulsion constant, adjust for wider/narrower spacing
  spring_length = 500; // base resting length of springs
  stepsize = 0.0005;
  task: any = null;
  posx = 0;
  posy = 0;

  createVertex(name: string) {
    const v: Vertex = {
      posx: this.posx += 10,
      posy: this.posy += 10,
      edges: {},
      h: 300,
      w: 200
    };

    this.vertices[name] = v;
    this.updateLayout();
  }

  createEdge(a: any, b: any) {
    this.vertices[a].edges[b] = { dest : b };
    this.updateLayout();
  }

  updateLayout() {
    for (let iter = 0; iter < 1000; iter++) {
      for (let i in this.vertices) {
        this.forcex[i] = 0;
        this.forcey[i] = 0;

        for (let j in this.vertices) {
          if (i !== j) {
            // using rectangle's center, bounding box would be better
            var deltax = this.vertices[j].posx - this.vertices[i].posx;
            var deltay = this.vertices[j].posy - this.vertices[i].posy;
            var d2 = deltax * deltax + deltay * deltay;

            // add some jitter if distance^2 is very small
            if (d2 < 0.01) {
              deltax = 0.1 * Math.random() + 0.1;
              deltay = 0.1 * Math.random() + 0.1;
              var d2 = deltax * deltax + deltay * deltay;
            }

            // Coulomb's law -- repulsion varies inversely with square of distance
            this.forcex[i] -= (this.repulsion / d2) * deltax;
            this.forcey[i] -= (this.repulsion / d2) * deltay;

            // spring force along edges, follows Hooke's law
            if (this.vertices[i].edges[j]) {
              var distance = Math.sqrt(d2);
              this.forcex[i] += (distance - this.spring_length) * deltax;
              this.forcey[i] += (distance - this.spring_length) * deltay;
            }
          }
        }
      }

      for (let i in this.vertices) {
        // update rectangles
        this.vertices[i].posx += this.forcex[i] * this.stepsize;
        this.vertices[i].posy += this.forcey[i] * this.stepsize;
      }
    }

    // Once iterations have been completed, move everything to (0,0) coordinate system
    let minPosX = 0;
    let minPosY = 0;
    for (let i in this.vertices) {
      const { posx, posy } = this.vertices[i];
      if (posx < minPosX) {
        minPosX = posx;
      }

      if (posy < minPosY) {
        minPosY = posy;
      }
    }

    console.log(this.vertices)

    for (let i in this.vertices) {
      if (minPosX < 0) {
        this.vertices[i].posx += Math.abs(minPosX);
      }

      if (minPosY < 0) {
        this.vertices[i].posy += Math.abs(minPosY);
      }
    }
  }
}
