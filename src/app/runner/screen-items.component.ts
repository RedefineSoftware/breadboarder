import { Component, Input } from '@angular/core';
import { BbmlItemType, BbmlScreenItem } from '../shared/ast.model';

@Component({
  selector: 'bb-screen-items',
  template: `
    <ng-container *ngFor="let item of items">
      <bb-field [field]="item" *ngIf="item.type === BbmlItemType.Field"></bb-field>
      <bb-button [button]="item" *ngIf="item.type === BbmlItemType.Button"></bb-button>
      <bb-label [label]="item" *ngIf="item.type === BbmlItemType.Label"></bb-label>
      <bb-component [component]="item" *ngIf="item.type === BbmlItemType.Component"></bb-component>
      <bb-conditional [conditional]="item" *ngIf="item.type === BbmlItemType.Conditional"></bb-conditional>
    </ng-container>
  `
})
export class ScreenItemsComponent {
  @Input() items?: BbmlScreenItem[] = [];
  public BbmlItemType = BbmlItemType;
}