import { Component, Output, EventEmitter, OnInit} from '@angular/core';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: any;
  items: MenuItem[] = [];

  constructor(
    private authService:AuthService
  ){}

  @Output() collapsedChange = new EventEmitter<boolean>();
  status: boolean = false;
  showUserMenu: boolean = false;

  ngOnInit(){
    this.getUserInfo();
    this.items = [
        {label: 'Cambiar Contraseña', icon: 'pi pi-key', routerLink: ['/auth/login/recover'],command: () => {
          this.closeSession()
        }},
        {label: 'Cerrar Sesión', icon: 'pi pi-sign-out', routerLink: ['/auth/login'],command: () => {
          this.closeSession()
        }}
    ];
  }
  toggleSidebar(){
    this.status = !this.status;
    this.collapsedChange.emit(this.status);
  }
  toggleUserMenu(){
    this.showUserMenu = !this.showUserMenu;
    console.log("toggleUserMenu");
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

  closeSession(){
   this.authService.logOut();
  }

}

export interface user{
  name: String;
  email: String;
  role: String;
  img: String;
}
