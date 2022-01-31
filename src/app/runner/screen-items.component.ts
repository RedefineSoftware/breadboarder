import { Component, Input } from '@angular/core';
import { BbmlItemType, BbmlScreenItem } from '../shared/ast.model';

@Component({
  selector: 'bb-screen-items',
  template: `
    <div class="screen-items" [ngClass]="{ 'screen-items--horizontal': orientation === 'horizontal' }">
      <ng-container *ngFor="let item of items">
        <bb-field [field]="item" *ngIf="item.type === BbmlItemType.Field"></bb-field>
        <bb-button [button]="item" *ngIf="item.type === BbmlItemType.Button"></bb-button>
        <bb-label [label]="item" *ngIf="item.type === BbmlItemType.Label"></bb-label>
        <bb-component [component]="item" *ngIf="item.type === BbmlItemType.Component"></bb-component>
        <bb-conditional [conditional]="item" *ngIf="item.type === BbmlItemType.Conditional"></bb-conditional>
        <bb-vstack [vstack]="item" *ngIf="item.type === BbmlItemType.VStack"></bb-vstack>
        <bb-hstack [hstack]="item" *ngIf="item.type === BbmlItemType.HStack"></bb-hstack>
      </ng-container>
    </div>
  `,
  styles: [`
    .screen-items {
      display: flex;
      flex-direction: column;
    }

    .screen-items--horizontal {
      flex-direction: row;
    }

    .screen-items > * {
      flex: 1;
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
  @Input() orientation: 'horizontal' | 'vertical' = 'vertical';

  public BbmlItemType = BbmlItemType;
}