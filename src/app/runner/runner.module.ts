import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button.component';
import { ComponentComponent } from './component.component';
import { ConditionalComponent } from './conditional.component';
import { FieldComponent } from './field.component';
import { HStackComponent } from './hstack.component';
import { LabelComponent } from './label.component';
import { RunnerComponent } from './runner.component';
import { RunnerService } from './runner.service';
import { ScreenItemsComponent } from './screen-items.component';
import { ScreenComponent } from './screen.component';
import { VStackComponent } from './vstack.component';

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
    ConditionalComponent,
    VStackComponent,
    HStackComponent
  ],
  exports: [
    RunnerComponent
  ],
  providers: [
    RunnerService
  ]
})
export class RunnerModule {

}