import { Component, Input } from '@angular/core';
import { BbmlField } from '../shared/ast.model';

@Component({
  selector: 'bb-field',
  template: `
    {{ field?.label }} <input type="text" />
  `
})
export class FieldComponent {
  @Input() field?: BbmlField;
}