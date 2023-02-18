import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorRoutingModule } from './administrator-routing.module';
import { AdministratorComponent } from './pages/administrator.component';
import { ClientsComponent } from './pages/clients/clients.component';
import { SharedModule } from 'src/app/shared/shared.module';

import { ToolbarModule } from 'primeng/toolbar';
import { SplitButtonModule } from 'primeng/splitbutton';

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
import { NewClientsComponent } from './pages/clients/components/new-clients/new-clients.component';

import {ScrollPanelModule} from 'primeng/scrollpanel';
import { RoomsComponent } from './pages/rooms/rooms.component';
import { NewRoomsComponentComponent } from './pages/rooms/components/new-rooms.component/new-rooms.component.component';


@NgModule({
  declarations: [
    AdministratorComponent,
    ClientsComponent,
    NewClientsComponent,
    RoomsComponent,
    NewRoomsComponentComponent
  ],
  imports: [
    CommonModule,
    AdministratorRoutingModule,
    SharedModule,
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
    MessagesModule
  ],
  providers: [ConfirmationService]
})
export class AdministratorModule { }
