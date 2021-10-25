import { Component, Input } from '@angular/core';
import { BbmlField } from '../shared/ast.model';

@Component({
  selector: 'bb-field',
  template: `
    <div class="field">
      <label>{{ field?.label }}</label>
      <input type="text" />
    </div>
  `,
  styles: [`
    .field { 
      display: flex; 
      flex-direction: column;
    }

    .field label {
      font-size: 0.6em;
      margin: 2px;
    }

    .field input {
      width: 100%;
      box-sizing: border-box;
    }
  `]
})
export class FieldComponent {
  @Input() field?: BbmlField;
}