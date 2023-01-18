import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './pages/home.component';
import { CalendarComponent } from './pages/components/calendar/calendar.component';
import { FullCalendarModule } from '@fullcalendar/angular';



@NgModule({
  declarations: [
    HomeComponent,
    CalendarComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
    FullCalendarModule
  ]
})
export class HomeModule { }
