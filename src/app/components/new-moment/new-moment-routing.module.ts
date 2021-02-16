import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewMomentComponent } from './new-moment.component';

const routes: Routes = [
  {
    path: '',
    component: NewMomentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewMomentRoutingModule { }
