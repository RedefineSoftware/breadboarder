import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ButtonComponent } from './button.component';
import { FieldComponent } from './field.component';
import { LabelComponent } from './label.component';
import { RunnerComponent } from './runner.component';
import { ScreenComponent } from './screen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RunnerComponent,
    ScreenComponent,
    FieldComponent,
    ButtonComponent,
    LabelComponent
  ],
  exports: [
    RunnerComponent
  ],
  providers: []
})
export class RunnerModule {

}