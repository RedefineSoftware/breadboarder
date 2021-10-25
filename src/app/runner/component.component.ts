import { Component, Input } from '@angular/core';
import { BbmlComponent } from '../shared/ast.model';

@Component({
  selector: 'bb-component',
  template: `
    <div class="component">
      {{ component?.name }}
    </div>
  `
})
export class ComponentComponent {
  @Input() component?: BbmlComponent;
}