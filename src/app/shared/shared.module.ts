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
import { FooterComponent } from './components/footer/footer.component';
import { HeaderModule } from './components/header/header.module';
import { NodeService } from './services/node.service';
import { TagModule } from 'primeng/tag';
import { HttpClientModule } from '@angular/common/http';
import {ToastModule} from 'primeng/toast';
@NgModule({
  declarations: [
    FooterComponent
  ],
  imports: [
    ToastModule,
    CommonModule,
    FieldsetModule,
    RadioButtonModule,
    ButtonModule,
    HeaderModule,
    SidebarModule,
    ImageModule,
    DropdownModule,
    HttpClientModule,
    FormsModule,
    TriStateCheckboxModule,
    RouterModule,
    TagModule,
  ],
  exports:[
    ToastModule,
    HeaderModule,
    FooterComponent,
    PasswordModule,
    InputTextModule,
    FieldsetModule,
    RadioButtonModule,
    ButtonModule,
    TagModule,
    FormsModule,
    TriStateCheckboxModule,
    RouterModule
  ],
  providers: [NodeService]
})
export class SharedModule { }
