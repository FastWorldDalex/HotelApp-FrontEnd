import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FieldsetModule} from 'primeng/fieldset';
import {PasswordModule} from 'primeng/password';
import {InputTextModule} from 'primeng/inputtext';
import {RadioButtonModule} from 'primeng/radiobutton';
import {ButtonModule} from 'primeng/button';
import { FormsModule } from '@angular/forms';
import {TriStateCheckboxModule} from 'primeng/tristatecheckbox';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FieldsetModule,
    RadioButtonModule,
    ButtonModule,
    FormsModule,
    TriStateCheckboxModule,
    RouterModule
  ],
  exports:[
    PasswordModule,
    InputTextModule,
    FieldsetModule,
    RadioButtonModule,
    ButtonModule,
    FormsModule,
    TriStateCheckboxModule,
    RouterModule
  ]
})
export class SharedModule { }
