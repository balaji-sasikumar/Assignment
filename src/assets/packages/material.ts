import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
@NgModule({
  exports: [MatTableModule, MatSortModule, MatIconModule],
  providers: [],
})
export class Material {}
