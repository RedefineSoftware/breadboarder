import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RunnerComponent } from './runner.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    RunnerComponent
  ],
  exports: [
    RunnerComponent
  ],
  providers: []
})
export class RunnerModule {

}