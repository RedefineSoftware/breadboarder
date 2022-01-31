import { Component, Input } from '@angular/core';
import { BbmlHStack } from '../shared/ast.model';

@Component({
  selector: 'bb-hstack',
  template: `
    <div class="hstack">
      <bb-screen-items orientation="horizontal" [items]="hstack?.items"></bb-screen-items>
    </div>
  `
})
export class HStackComponent {
  @Input() hstack?: BbmlHStack;
}