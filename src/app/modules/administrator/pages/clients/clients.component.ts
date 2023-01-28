import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, Message, PrimeNGConfig } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdministratorService } from '../../services/administrator.service';
import { Client, Country, POSTClient } from './interface/iclient';
import { NodeService } from '../../../../shared/services/node.service';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
})
export class ClientsComponent {
  items: MenuItem[] =[];
  titulos: string[] = [];
  ltsClientes: Client[] = [];
  clientDialog: boolean = false;

  client:Client = {
    id: 0,
    firstname: '',
    lastname: '',
    document: '',
    phone: '',
    email: '',
    status: 0,
    country_id: 0,
    reservations_quantity: 0,
    last_reservation: new Date(),
    created_date: new Date()
  };
  POSTclient:POSTClient = {
    firstname: '',
    lastname: '',
    document: '',
    phone: '',
    email: '',
    status: 0,
    country_id: 0,
  };

  //Form Client
  countries: Country[] = [];
  selectedEstado: string | undefined;
  //Confirm Dialog
  msgs: Message[] = [];

  constructor(
    private administratorService:AdministratorService,
    private nodeService:NodeService
  ) {}
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

    
    this.items = [
            {label: 'Ver detalle', icon: 'pi pi-eye', command: ()=>this.abrirModal("VER")},
            {label: 'Editar', icon: 'pi pi-file-edit', command: ()=>this.abrirModal("EDITAR") },
            {label: 'Eliminar', icon: 'pi pi-trash', routerLink: ['/auth/login']},
            {label: 'Desactivar', icon: 'pi pi-check-square', routerLink: ['/auth/login']}
    ];
    this.getClient();
    this.nodeService.getCountry().then((paises)=>{
      this.countries = paises;
    })
    //Confirmation Dialog
    //this.primengConfig.ripple=true;
  }
  
  getClient(){
    this.administratorService.getClients().then((clientes) => {
      if(clientes!=null || clientes.length >0){
      this.ltsClientes =clientes;
      
      console.log("LISTA CLIENTES", this.ltsClientes);
      }else{
        console.log("FALLO BUSCAR CLIENTE");
        
      }
    });
  }

  abrirModal(operacion:string){
    switch(operacion){
      case "NUEVO":
        this.clientDialog = true;
        break;
      case "EDITAR":
        this.clientDialog = true;
        break;
        case "VER":
          this.clientDialog = true;
          break;
    }
    
  }

  posClient(){
    this.POSTclient.status = 1;
    this.POSTclient.country_id= this.POSTclient.country_id.id
    this.administratorService.postClients(this.POSTclient).then((response) => {
      if(response!=null || response.length >0){
      
      console.log("RESPUESTA", response);
      this.getClient();
      this.clientDialog = false;
      }else{
        console.log("FALLO INSERTAR CLIENTE");
        
      }
    });
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

