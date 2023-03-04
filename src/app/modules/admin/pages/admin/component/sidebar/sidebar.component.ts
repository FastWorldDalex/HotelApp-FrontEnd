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

  constructor(private router: Router ) {

  }

  ngOnInit() {
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
    }
  }
}
