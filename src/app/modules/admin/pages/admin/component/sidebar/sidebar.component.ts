import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  user: any;
  @Input() collapsed: boolean = false;
  currentModule: string = 'calendar';
  modules: any;
  constructor(private router: Router ) {
  }

  ngOnInit() {
    this.getUserInfo();
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


  getUserInfo(){
    if(sessionStorage.getItem("user") != null && sessionStorage.getItem("user") !=''){
      let userInfo = JSON.parse(sessionStorage.getItem("user") || '{}');
      this.user = {
        name: userInfo.firstname + ' ' +userInfo.lastname,
        email: userInfo.email,
        role:  userInfo.role,
        img: "../assets/img//users/user-1png.png"
      };
    }
  }

}

export interface user{
  name: String;
  email: String;
  role: String;
  img: String;
}
