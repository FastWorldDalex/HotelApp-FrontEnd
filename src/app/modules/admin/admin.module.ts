import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FullCalendarModule } from '@fullcalendar/angular';
// PrimeNg Components
import {FormsModule} from '@angular/forms';
import {TableModule} from 'primeng/table';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ButtonModule} from 'primeng/button';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {RadioButtonModule} from 'primeng/radiobutton';
import {InputNumberModule} from 'primeng/inputnumber';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';
import {InputMaskModule} from 'primeng/inputmask';
import { MessagesModule } from 'primeng/messages';
import { ToolbarModule } from 'primeng/toolbar';
import { TagModule } from 'primeng/tag';
import {ScrollPanelModule} from 'primeng/scrollpanel';
import { SplitButtonModule } from 'primeng/splitbutton';
import { TabViewModule } from 'primeng/tabview';
import { InputTextareaModule } from 'primeng/inputtextarea';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { SidebarComponent } from './pages/admin/component/sidebar/sidebar.component';
import { MainContentComponent } from './pages/admin/component/main-content/main-content.component';
import { HeaderComponent } from './pages/admin/component/main-content/component/header/header.component';
import { PageContentComponent } from './pages/admin/component/main-content/component/page-content/page-content.component';
import { FooterComponent } from './pages/admin/component/main-content/component/footer/footer.component';
import { RoomsComponent } from './pages/admin/component/main-content/component/rooms/rooms.component';
import { ClientsComponent } from './pages/admin/component/main-content/component/clients/clients.component';
import { NewRoomsComponent } from './pages/admin/component/main-content/component/rooms/components/new-rooms/new-rooms.component';
import { NewClientsComponent } from './pages/admin/component/main-content/component/clients/components/new-clients/new-clients.component';
import { CalendarComponent } from './pages/admin/component/main-content/component/calendar/calendar.component';
import { NewReservationComponent } from './pages/admin/component/main-content/component/calendar/components/new-reservation/new-reservation.component';
import { ClosedDateComponent } from './pages/admin/component/main-content/component/calendar/components/closed-date/closed-date.component';

import { NodeService } from './../../shared/services/node.service';

@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    MainContentComponent,
    HeaderComponent,
    PageContentComponent,
    FooterComponent,
    RoomsComponent,
    ClientsComponent,
    NewRoomsComponent,
    NewClientsComponent,
    CalendarComponent,
    NewReservationComponent,
    ClosedDateComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ScrollPanelModule,
    ToolbarModule,
    SplitButtonModule,
    TableModule,
    CalendarModule,
		SliderModule,
		DialogModule,
		MultiSelectModule,
		ContextMenuModule,
		DropdownModule,
		ButtonModule,
		ToastModule,
    InputTextModule,
    ProgressBarModule,
    FormsModule,
    InputNumberModule,
    InputMaskModule,
    RadioButtonModule,
    ConfirmDialogModule,
    MessagesModule,
    TagModule,
    FullCalendarModule,
    TabViewModule,
    InputTextareaModule
  ],
  providers: [ConfirmationService, NodeService]
})
export class AdminModule { }
