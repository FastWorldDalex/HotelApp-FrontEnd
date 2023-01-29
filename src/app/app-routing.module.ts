import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: ()=> import('../app/modules/auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'home',
    loadChildren: ()=> import('../app/modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: 'adm',
    loadChildren: ()=> import('../app/modules/administrator/administrator.module').then(m => m.AdministratorModule)
  },
  {
    path: 'admin',
    loadChildren: ()=> import('../app/modules/admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: '**',
    redirectTo: '/auth/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
