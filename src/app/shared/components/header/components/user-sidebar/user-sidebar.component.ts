import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-user-sidebar',
  templateUrl: './user-sidebar.component.html',
  styleUrls: ['./user-sidebar.component.scss']
})
export class UserSidebarComponent implements OnInit{
  items: MenuItem[] = [];
  user: user ={
        name: "John Doe",
        role: "ADMINISTRADOR",
        img: "../assets/img//users/user-1png.png"
  };

  constructor(
    private authService:AuthService
  ){}
  
  ngOnInit(){
    this.items = [
        {label: 'Cambiar Contraseña', icon: 'pi pi-key', routerLink: ['/auth/login/recover'],command: () => {
          this.cerrarSesion()
        }},
        {label: 'Cerrar Sesión', icon: 'pi pi-sign-out', routerLink: ['/auth/login'],command: () => {
          this.cerrarSesion()
        }}
    ];
  }

  cerrarSesion(){
    this.authService.logOut();
  }
}

export interface user{
    name: String;
    role: String;
    img: String;
}
