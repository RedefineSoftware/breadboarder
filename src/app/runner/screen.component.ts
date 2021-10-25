import { Component, Input } from '@angular/core';
import { BbmlItemType, BbmlScreen } from '../shared/ast.model';

@Component({
  selector: 'bb-screen',
  template: `
    <div class="screen-name">
      <span>{{ screen?.name }}</span>
    </div>
    <div class="screen">
      <ng-container *ngFor="let item of screen?.items">
        <bb-field [field]="item" *ngIf="item.type === BbmlItemType.Field"></bb-field>
        <bb-button [button]="item" *ngIf="item.type === BbmlItemType.Button"></bb-button>
        <bb-label [label]="item" *ngIf="item.type === BbmlItemType.Label"></bb-label>
      </ng-container>
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

  public BbmlItemType = BbmlItemType;
}