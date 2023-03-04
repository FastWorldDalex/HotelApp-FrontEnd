import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './pages/admin/admin.component';
import { ClientsComponent } from './pages/admin/component/main-content/component/clients/clients.component';
import { RoomsComponent } from './pages/admin/component/main-content/component/rooms/rooms.component';
import { CalendarComponent } from './pages/admin/component/main-content/component/calendar/calendar.component';
import { UsersComponent } from './pages/admin/component/main-content/component/users/users.component';

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
    path: 'users',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: UsersComponent,
      },
    ],
  },
  {
    path: 'calendar',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: CalendarComponent,
      },
    ],
  },
  {
    path: '**',
    redirectTo: '/admin/calendar',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
