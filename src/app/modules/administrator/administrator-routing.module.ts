import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './pages/administrator.component';
import { ClientsComponent } from './pages/clients/clients.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/adm/clients',
    pathMatch: 'full',
  },
  {
    path: 'clients',
    component: AdministratorComponent,
    children: [
      {
        path: '',
        component: ClientsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/adm/clients',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministratorRoutingModule {}
