import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { ComponentComponent } from './component.component';
import { ConditionalComponent } from './conditional.component';
import { FieldComponent } from './field.component';
import { LabelComponent } from './label.component';
import { RunnerComponent } from './runner.component';
import { ScreenItemsComponent } from './screen-items.component';
import { ScreenComponent } from './screen.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    RunnerComponent,
    ScreenComponent,
    FieldComponent,
    ButtonComponent,
    LabelComponent,
    ComponentComponent,
    ScreenItemsComponent,
    ConditionalComponent
  ],
  exports: [
    RunnerComponent
  ],
  providers: []
})
export class RunnerModule {

}