import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// PrimeNg Components
import { ToolbarModule } from 'primeng/toolbar';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import { TagModule } from 'primeng/tag';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { SidebarComponent } from './pages/admin/component/sidebar/sidebar.component';
import { MainContentComponent } from './pages/admin/component/main-content/main-content.component';
import { HeaderComponent } from './pages/admin/component/main-content/component/header/header.component';
import { PageContentComponent } from './pages/admin/component/main-content/component/page-content/page-content.component';
import { FooterComponent } from './pages/admin/component/main-content/component/footer/footer.component';
import { RoomsComponent } from './pages/admin/component/main-content/component/rooms/rooms.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    MainContentComponent,
    HeaderComponent,
    PageContentComponent,
    FooterComponent,
    RoomsComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ToolbarModule,
    ButtonModule,
    TableModule,
    TagModule
  ]
})
export class AdminModule { }
