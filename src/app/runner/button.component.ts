import { Component, Input } from '@angular/core';
import { BbmlButton, BbmlComponentName } from '../shared/ast.model';

@Component({
  selector: 'bb-button',
  template: `
    <button (click)="activateScreen(button?.destination)">{{ button?.label }}</button>
  `
})
export class ButtonComponent {
  @Input() button?: BbmlButton;

  activateScreen(destination?: BbmlComponentName) {
    if (destination) {

    }
  }
}