import { Component, Input } from '@angular/core';
import { BbmlItemType, BbmlScreenItem } from '../shared/ast.model';

@Component({
  selector: 'bb-screen-items',
  template: `
    <div class="screen-items">
      <ng-container *ngFor="let item of items">
        <bb-field [field]="item" *ngIf="item.type === BbmlItemType.Field"></bb-field>
        <bb-button [button]="item" *ngIf="item.type === BbmlItemType.Button"></bb-button>
        <bb-label [label]="item" *ngIf="item.type === BbmlItemType.Label"></bb-label>
        <bb-component [component]="item" *ngIf="item.type === BbmlItemType.Component"></bb-component>
        <bb-conditional [conditional]="item" *ngIf="item.type === BbmlItemType.Conditional"></bb-conditional>
      </ng-container>
    </div>
  `,
  styles: [`
    .screen-items {
      display: flex;
      flex-direction: column;
    }

    .screen-items > * {
      margin-bottom: 8px;
      border: 1px solid #222;
      color: #f5f5f5;
      padding: 4px;
      border-radius: 4px;
      background: #333;
    }
  `]
})
export class ScreenItemsComponent {
  @Input() items?: BbmlScreenItem[] = [];
  public BbmlItemType = BbmlItemType;
}