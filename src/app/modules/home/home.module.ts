import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './pages/home.component';
import { CalendarComponent } from './pages/components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';

import {DialogModule} from 'primeng/dialog';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import {InputNumberModule} from 'primeng/inputnumber';

@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent
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
    InputNumberModule
  ]
})
export class HomeModule { }
