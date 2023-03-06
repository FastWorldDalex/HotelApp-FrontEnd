import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() collapsed: boolean = false;
  currentModule: string = 'calendar';
  modules: any;
  constructor(private router: Router ) {
  }

  ngOnInit() {

    this.getModules();

    switch(this.router.url){
      case '/admin/calendar':
        this.currentModule = 'calendar';
        break;
      case '/admin/clients':
        this.currentModule = 'clients';
        break;
      case '/admin/rooms':
        this.currentModule = 'rooms';
        break;
      case '/admin/users':
        this.currentModule = 'users';
        break;
      case '/admin/roles':
        this.currentModule = 'roles';
        break;
    }
  }

  getModules(){
    if(sessionStorage.getItem("modules") != null){
      this.modules = JSON.stringify(sessionStorage.getItem("modules"))
    }else{
      this.modules = [];
    }
  }
}
