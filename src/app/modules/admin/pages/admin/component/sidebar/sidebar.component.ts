import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() collapsed: boolean = false;
  currentModule: string = 'rooms';

  constructor(private router: Router ) {

  }

  ngOnInit() {
    switch(this.router.url){
      case '/admin/clients':
        this.currentModule = 'clients';
        break;
      case '/admin/rooms':
        this.currentModule = 'rooms';
        break;
    }
  }
}
