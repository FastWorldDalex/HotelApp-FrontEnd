import { Component, OnInit } from '@angular/core';
import { MenuItem, SelectItem } from 'primeng/api';

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

  constructor(){


    /*this.items = [

        {
            label:'Jhon Doe',
            icon:'pi pi-fw pi-user',
            items:[
                {
                    label:'',
                    icon:'pi pi-fw pi-user-plus',
  
                },
                {
                    label:'Nueva Contraseña',
                    icon:'pi pi-fw pi-key',
  
                },
                {
                    label:'Cerrar Sesión',
                    icon:'pi pi-fw pi-sign-out',
                    items:[
                    {
                        label:'Filter',
                        icon:'pi pi-fw pi-filter',
                        items:[
                            {
                                label:'Print',
                                icon:'pi pi-fw pi-print'
                            }
                        ]
                    },
                    {
                        icon:'pi pi-fw pi-bars',
                        label:'List'
                    }
                    ]
                }
            ]
        }
    ];*/
  }
  ngOnInit(){
    this.items = [
        {label: 'Cambiar Contraseña', icon: 'pi pi-key', routerLink: ['/auth/login/recover']},
        {label: 'Cerrar Sesión', icon: 'pi pi-sign-out', routerLink: ['/auth/login']}
    ];
  }
}

export interface user{
    name: String;
    role: String;
    img: String;
}