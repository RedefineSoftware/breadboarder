import { Component, Input } from '@angular/core';
import { BbmlVStack } from '../shared/ast.model';

@Component({
  selector: 'bb-vstack',
  template: `
    <div class="vstack">
      <bb-screen-items orientation="vertical" [items]="vstack?.items"></bb-screen-items>
    </div>
  `
})
export class VStackComponent {
  @Input() vstack?: BbmlVStack;
}