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
  }

  /*
  Funcion click para cada item del split button
  command:()=>{this.editProduct}
  command:()=>{this.deleteProduct}

  Funciones click() para cada boton 
  editProduct(product: Product) {
    this.product = { ...product };
    this.productDialog = true;
  }

  deleteProduct(product: Product) {
    this.confirmationService.confirm({
      message: '¿Estas seguro de eliminar al cliente ' + product.name + '?',
      header: 'Eliminar Cliente',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.products = this.products.filter((val) => val.id !== product.id);
        this.product = {};
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Producto eliminado',
          life: 3000,
        });
      },
    });
  }
  hideDialog() {
    this.productDialog = false;
    this.submitted = false;
  }

  saveProduct() {
    this.submitted = true;

    if (this.product.name.trim()) {
      if (this.product.id) {
        this.products[this.findIndexById(this.product.id)] = this.product;
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Cliente actualizado',
          life: 3000,
        });
      } else {
        this.product.id = this.createId();
        this.product.image = 'product-placeholder.svg';
        this.products.push(this.product);
        this.messageService.add({
          severity: 'success',
          summary: 'Confirmación',
          detail: 'Cliente creado',
          life: 3000,
        });
      }

      this.products = [...this.products];
      this.productDialog = false;
      this.product = {};
    }
  }

  */
}
