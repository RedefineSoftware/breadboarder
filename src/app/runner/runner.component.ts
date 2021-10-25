import { Component, Input } from '@angular/core';
import { BbmlItemType, BbmlSyntaxTree } from '../shared/ast.model';

@Component({
  selector: 'bb-runner',
  template: `
    <ng-container *ngFor="let item of ast">
      <ng-container [ngSwitch]="item.type">
        <bb-screen [screen]="item" *ngSwitchCase="BbmlItemType.Screen"></bb-screen>
      </ng-container>
    </ng-container>
  `
})
export class RunnerComponent {
  @Input() ast?: BbmlSyntaxTree;
  public BbmlItemType = BbmlItemType;
}