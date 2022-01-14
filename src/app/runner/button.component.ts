import { Component, Input } from '@angular/core';
import { BbmlButton, BbmlComponentName } from '../shared/ast.model';
import { RunnerService } from './runner.service';

@Component({
  selector: 'bb-button',
  template: `
    <button (click)="activateScreen($event, button?.destination)">{{ button?.label }}</button>
  `
})
export class ButtonComponent {
  @Input() button?: BbmlButton;

  constructor(public runnerService: RunnerService) {}

  activateScreen($event: MouseEvent, destination?: BbmlComponentName) {
    $event.stopPropagation();
    if (destination) {
      this.runnerService.activeScreen$.next(destination);
    }
  }
}