import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./components/sign-up/sign-up.module').then(m => m.SignUpModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./components/login/login.module').then(m => m.LoginModule)
  },
  {
    path: 'moment-list',
    loadChildren: () => import('./components/moment-list/moment-list.module').then(m => m.MomentListModule)
  },
  {
    path: 'new-moment',
    loadChildren: () => import('./components/new-moment/new-moment.module').then(m => m.NewMomentModule)
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
