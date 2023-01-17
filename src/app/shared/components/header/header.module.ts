import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdministratorSidebarComponent } from './components/administrator-sidebar/administrator-sidebar.component';
import { HeaderComponent } from './header.component';
import { SidebarModule } from 'primeng/sidebar';
import { ImageModule } from 'primeng/image';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { UserSidebarComponent } from './components/user-sidebar/user-sidebar.component';
import {AvatarModule} from 'primeng/avatar';
import {TreeModule} from 'primeng/tree';
import { HttpClientModule } from '@angular/common/http';
import {MenubarModule} from 'primeng/menubar';
import {SplitButtonModule} from 'primeng/splitbutton';

@NgModule({
  declarations: [
    HeaderComponent,
    AdministratorSidebarComponent,
    UserSidebarComponent,
  ],
  imports: [
    CommonModule,
    SidebarModule,
    ImageModule,
    DropdownModule,
    ButtonModule,
    AvatarModule,
    HttpClientModule,
    TreeModule,
    MenubarModule,
    SplitButtonModule
  ],
  exports:[
    HeaderComponent
  ]
})
export class HeaderModule { }
