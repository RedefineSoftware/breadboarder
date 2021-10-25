import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RunnerComponent } from './runner.component';
import { ScreenComponent } from './screen.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RunnerComponent,
    ScreenComponent
  ],
  exports: [
    RunnerComponent
  ],
  providers: []
})
export class RunnerModule {

}