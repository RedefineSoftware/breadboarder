import { Component, Input } from '@angular/core';
import { BbmlConditional } from '../shared/ast.model';

@Component({
  selector: 'bb-conditional',
  template: `
    <label>
      <input type="checkbox" [(ngModel)]="condition" /> {{ conditional?.condition }}
    </label>
    <bb-screen-items [items]="conditional?.ifItems" *ngIf="condition"></bb-screen-items>
    <bb-screen-items [items]="conditional?.elseItems" *ngIf="!condition"></bb-screen-items>
  `
})
export class ConditionalComponent {
  @Input() conditional?: BbmlConditional;
  condition = true;
}