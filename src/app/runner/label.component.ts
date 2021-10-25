import { Component, Input } from '@angular/core';
import { BbmlLabel } from '../shared/ast.model';

@Component({
  selector: 'bb-label',
  template: `
    <p>{{ label?.value }}</p>
  `
})
export class LabelComponent {
  @Input() label?: BbmlLabel;
}