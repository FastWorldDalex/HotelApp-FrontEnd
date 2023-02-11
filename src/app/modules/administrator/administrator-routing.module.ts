import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdministratorComponent } from './pages/administrator.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { RoomsComponent } from './pages/rooms/rooms.component';

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
    path: 'rooms',
    component: AdministratorComponent,
    children: [
      {
        path: '',
        component: RoomsComponent,
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
