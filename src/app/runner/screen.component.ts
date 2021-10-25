import { Component, Input } from '@angular/core';
import { BbmlScreen } from '../shared/ast.model';

@Component({
  selector: 'bb-screen',
  template: `
    <div class="screen">
      Screen: {{ screen?.name }}
    </div>
  `,
  styles: [`
    .screen {
      border-radius: 8px;
      border: 1px solid black;
      width: 200px;
      height: 300px;
    }
  `]
})
export class ScreenComponent {
  @Input() screen?: BbmlScreen;
}