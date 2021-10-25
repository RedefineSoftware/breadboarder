import { Component, Input } from '@angular/core';
import { BbmlItemType, BbmlSyntaxTree } from '../shared/ast.model';

@Component({
  selector: 'bb-runner',
  template: `
    <div class="runner">
      <ng-container *ngFor="let item of ast">
        <bb-screen [screen]="item" *ngIf="item.type === BbmlItemType.Screen"></bb-screen>
      </ng-container>
    </div>
  `,
  styles: [`
    .runner {
      display: flex;
      flex: 1;
    }

    .runner > * {
      margin: 8px;
    }
  `]
})
export class RunnerComponent {
  @Input() ast?: BbmlSyntaxTree;
  public BbmlItemType = BbmlItemType;
}