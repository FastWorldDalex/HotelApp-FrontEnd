import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './modules/auth/guards/auth.guard';

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
    loadChildren: ()=> import('../app/modules/home/home.module').then(m => m.HomeModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] },
  {
    path: 'adm',
    loadChildren: ()=> import('../app/modules/administrator/administrator.module').then(m => m.AdministratorModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] 
  },
  {
    path: 'admin',
    loadChildren: ()=> import('../app/modules/admin/admin.module').then(m => m.AdminModule),
    canActivate: [AuthGuard],
    canLoad: [AuthGuard] 
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
