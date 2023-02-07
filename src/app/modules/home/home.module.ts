import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './pages/home.component';
import { CalendarComponent } from './pages/components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import { DialogModule } from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { NewReservtationComponent } from './pages/components/new-reservtation/new-reservtation.component';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ScrollPanelModule } from 'primeng/scrollpanel';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent,
    NewReservtationComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FullCalendarModule,
    DialogModule,
    FormsModule,
    CalendarModule,
    DropdownModule,
    InputNumberModule,
    TabViewModule,
    InputTextModule,
    InputMaskModule,
    ScrollPanelModule
  ]
})
export class HomeModule { }
