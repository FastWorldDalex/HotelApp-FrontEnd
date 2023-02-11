import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ClientsComponent } from './pages/admin/component/main-content/component/clients/clients.component';
import { RoomsComponent } from './pages/admin/component/main-content/component/rooms/rooms.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent
  },
  {
    path: 'clients',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: ClientsComponent,
      },
    ],
  },
  {
    path: 'rooms',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: RoomsComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/admin/rooms',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
