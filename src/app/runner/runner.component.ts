import { Component, Input } from '@angular/core';
import { BbmlSyntaxTree } from '../shared/ast.model';

@Component({
  selector: 'bb-runner',
  template: `
    <div>this is the runner!</div>
  `
})
export class RunnerComponent {
  @Input() ast?: BbmlSyntaxTree;
}