import { Component, Input } from '@angular/core';
import { BbmlComponentName, BbmlScreen } from '../shared/ast.model';
import { RunnerService } from './runner.service';

@Component({
  selector: 'bb-screen',
  template: `
    <div class="screen-name">
      <span>{{ screen?.name }}</span>
    </div>
    <div class="screen" [ngClass]="{'screen--active': active}" (click)="activateSelf()">
      <bb-screen-items [items]="screen?.items"></bb-screen-items>
    </div>
  `,
  styles: [`
    .screen-name span {
      font-size: 0.7em;
      font-weight: bold;
      color: #f5f5f5;
      margin-left: 8px;
    }

    .screen {
      box-sizing: border-box;
      border-radius: 8px;
      width: 200px;
      height: 300px;
      padding: 8px;
      margin-top: 4px;
      overflow: auto;
      background: #1e1e1e;
      border: 2px solid #1e1e1e;
      box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px, rgba(0, 0, 0, 0.23) 0px 6px 6px;
    }

    .screen--active {
      border: 2px solid crimson;
    }
  `]
})
export class ScreenComponent {
  @Input() screen?: BbmlScreen;
  @Input() active?: boolean;

  constructor(public runnerService: RunnerService) {}

  activateSelf() {
    if (this.screen?.name) {
      this.runnerService.activeScreen$.next(this.screen?.name);
    }
  }
}