import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MomentListComponent } from './moment-list.component';
import { MomentListRoutingModule } from './moment-list-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'



@NgModule({
  declarations: [MomentListComponent],
  imports: [
    CommonModule,
    MomentListRoutingModule,
    MatSidenavModule,
    MatTableModule,
    MatCheckboxModule,
    HttpClientModule,
    CommonModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
  ]
})
export class MomentListModule { }
