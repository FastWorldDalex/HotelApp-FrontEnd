import { Component, ViewChild } from '@angular/core';
import { MenuItem, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { CustomerService } from '../../services/customer.service';
import { Customer, Representative } from './interface/Customer';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  items: MenuItem[] =[];
  titulos: string[] = [];
  ltsClientes: any[] = [];
  /*   items: MenuItem[] =[];


    customers: Customer[] = [];

    selectedCustomers: Customer[] = [];

    representatives: Representative[] = [];

    statuses: any[] = [];

    loading!: boolean;

    @ViewChild('dt') table!: Table;*/

  constructor() {}

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
            {label: 'Editar', icon: 'pi pi-file-edit', routerLink: ['/auth/login']},
            {label: 'Eliminar', icon: 'pi pi-trash', routerLink: ['/auth/login']},
            {label: 'Desactivar', icon: 'pi pi-check-square', routerLink: ['/auth/login']}
        ];
        /*


        this.representatives = [
          {name: "Amy Elsner", image: 'amyelsner.png'},
          {name: "Anna Fali", image: 'annafali.png'},
          {name: "Asiya Javayant", image: 'asiyajavayant.png'},
          {name: "Bernardo Dominic", image: 'bernardodominic.png'},
          {name: "Elwin Sharvill", image: 'elwinsharvill.png'},
          {name: "Ioni Bowcher", image: 'ionibowcher.png'},
          {name: "Ivan Magalhaes",image: 'ivanmagalhaes.png'},
          {name: "Onyama Limba", image: 'onyamalimba.png'},
          {name: "Stephen Shaw", image: 'stephenshaw.png'},
          {name: "XuXue Feng", image: 'xuxuefeng.png'}
      ];

      this.statuses = [
          {label: 'Unqualified', value: 'unqualified'},
          {label: 'Qualified', value: 'qualified'},
          {label: 'New', value: 'new'},
          {label: 'Negotiation', value: 'negotiation'},
          {label: 'Renewal', value: 'renewal'},
          {label: 'Proposal', value: 'proposal'}
      ]
      this.primengConfig.ripple = true;*/
  }
  //: { target: { value: any; }; }
  /* onActivityChange(event: { target: { value: any; }; }) {
      const value = event.target.value;
      if (value && value.trim().length) {
          const activity = parseInt(value);

          if (!isNaN(activity)) {
              this.table.filter(activity, 'activity', 'gte');
          }
      }
    }

    onDateSelect(value: { getMonth: () => any; getDate: () => any; getFullYear: () => string; }) {
      this.table.filter(this.formatDate(value), 'date', 'equals')
    }

    formatDate(date: { getMonth: () => any; getDate: () => any; getFullYear: () => string; }) {
        let month = date.getMonth() + 1;
        let day = date.getDate();

        if (month < 10) {
            month = '0' + month;
        }

        if (day < 10) {
            day = '0' + day;
        }

        return date.getFullYear() + '-' + month + '-' + day;
    }

    onRepresentativeChange(event: { value: any; }) {
        this.table.filter(event.value, 'representative', 'in')
    }*/
}
