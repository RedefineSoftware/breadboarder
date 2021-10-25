import { Component, Input } from '@angular/core';
import { BbmlScreen } from '../shared/ast.model';

@Component({
  selector: 'bb-screen',
  template: `
    <div class="screen-name">
      <span>{{ screen?.name }}</span>
    </div>
    <div class="screen">
      <bb-screen-items [items]="screen?.items"></bb-screen-items>
    </div>
  `,
  styles: [`
    .screen-name span {
      font-size: 0.7em;
      font-weight: bold;
      color: #888;
      margin-left: 8px;
    }

    .screen {
      border-radius: 8px;
      border: 1px solid black;
      width: 200px;
      height: 300px;
      padding: 8px;
      margin-top: 4px;
    }
  `]
})
export class ScreenComponent {
  @Input() screen?: BbmlScreen;
}