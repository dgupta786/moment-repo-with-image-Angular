import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewMomentComponent } from './new-moment.component';
import { NewMomentRoutingModule } from './new-moment-routing.module';

import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
// import { MatTabsModule } from '@angular/material/tabs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { MatSidenavModule } from '@angular/material/sidenav'




@NgModule({
  declarations: [NewMomentComponent],
  imports: [
    CommonModule,
    NewMomentRoutingModule,
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
export class NewMomentModule { }
