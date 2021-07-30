import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataIdadePipe } from './data-idade.pipe';

@NgModule({
  imports: [
    CommonModule
  ],
  exports:[DataIdadePipe],
  declarations: [DataIdadePipe]
})
export class PipesModule { }
