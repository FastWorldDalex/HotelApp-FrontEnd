import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldsetModule} from 'primeng/fieldset';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';

import { SidebarModule } from "primeng/sidebar";
import {ImageModule} from 'primeng/image';
import {DropdownModule} from 'primeng/dropdown';

import { FormsModule } from '@angular/forms';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/header/sidebar/sidebar.component';
import { FooterComponent } from './components/footer/footer.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent
  ],
  imports: [
    CommonModule,
    FieldsetModule,
    RadioButtonModule,
    ButtonModule,

    SidebarModule,
    ImageModule,
    DropdownModule,

    FormsModule,
    TriStateCheckboxModule,
    RouterModule
  ],
  exports:[
    HeaderComponent,
    FooterComponent,
    PasswordModule,
    InputTextModule,
    FieldsetModule,
    RadioButtonModule,
    ButtonModule,

    SidebarModule,
    ImageModule,
    DropdownModule,
    
    FormsModule,
    TriStateCheckboxModule,
    RouterModule
  ]
})
export class SharedModule { }
