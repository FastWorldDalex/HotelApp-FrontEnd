import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { Customer } from './interface/Customer';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  items: MenuItem[] =[];
  titulos: string[] = [];
  ltsClientes: any[] = [];

  clientDialog: boolean = false;

  //Form Client
  countries: Country[] = [];
  selectedCountry: Country | undefined;
  selectedEstado: string | undefined;
  //Confirm Dialog
  msgs: Message[] = [];

  constructor() {}
  //private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig

  ngOnInit() {
    this.titulos = [
      '#',
      'Nombres',
      'Apellidos',
      'Documento',
      'Teléfono',
      'Email',
      'País',
      'Cantidad de Reservas',
      'Última Reserva',
      'Fecha de Creación',
      'Estado',
      'Acciones',
    ];

    this.ltsClientes = [
      {
      num:'1',
      nombres:'Geampier. A',
      apellidos:'Santamaria de la Cruz',
      documento:'70691538',
      celular:'939377020',
      email:'geampier.smc@gmail.com',
      pais:'Perú',
      cantReservas:'2',
      fchUltReserva:'16/01/2023',
      fchCreacion:'24/01/2022',
      estado:'Activo'},
      {
        num:'1',
        nombres:'Luis. D',
        apellidos:'Santamaria de la Cruz',
        documento:'70691538',
        celular:'939377020',
        email:'geampier.smc@gmail.com',
        pais:'Perú',
        cantReservas:'2',
        fchUltReserva:'16/01/2023',
        fchCreacion:'24/01/2022',
        estado:'Inactivo'},
        {
          num:'1',
          nombres:'Ximena. A',
          apellidos:'Santamaria de la Cruz',
          documento:'70691538',
          celular:'939377020',
          email:'geampier.smc@gmail.com',
          pais:'Perú',
          cantReservas:'2',
          fchUltReserva:'16/01/2023',
          fchCreacion:'24/01/2022',
          estado:'Activo'}
    ];
    this.items = [
            {label: 'Ver detalle', icon: 'pi pi-eye', routerLink: ['/auth/login/recover']},
            {label: 'Editar', icon: 'pi pi-file-edit', command: ()=>this.editClient() },
            {label: 'Eliminar', icon: 'pi pi-trash', routerLink: ['/auth/login']},
            {label: 'Desactivar', icon: 'pi pi-check-square', routerLink: ['/auth/login']}
    ];

    //Form Client
    this.countries = [
      {name: 'Perú'},
      {name: 'Chile'}
    ];

    //Confirmation Dialog
    //this.primengConfig.ripple=true;
  }
  
  createClient(){
    this.clientDialog = true;
  }
  editClient(){
    this.clientDialog = true;
  }

  /*deleteClient(){
    this.confirmationService.confirm({
      message: '¿Está seguro de eliminar al cliente?',
      header: 'Eliminar cliente',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.msgs = [{severity:'info', summary:'Confirmación', detail:'Se ha elimado correctamente al cliente.'}];
      }
    });
  }*/
}


export interface Country{
  name: string
}
