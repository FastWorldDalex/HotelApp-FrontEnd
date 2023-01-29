import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './pages/admin/admin.component';
import { SidebarComponent } from './pages/admin/component/sidebar/sidebar.component';
import { MainContentComponent } from './pages/admin/component/main-content/main-content.component';
import { HeaderComponent } from './pages/admin/component/main-content/component/header/header.component';
import { PageContentComponent } from './pages/admin/component/main-content/component/page-content/page-content.component';
import { FooterComponent } from './pages/admin/component/main-content/component/footer/footer.component';


@NgModule({
  declarations: [
    AdminComponent,
    SidebarComponent,
    MainContentComponent,
    HeaderComponent,
    PageContentComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
