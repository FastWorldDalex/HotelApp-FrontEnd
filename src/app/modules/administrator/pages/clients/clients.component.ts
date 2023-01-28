import { Component, ViewChild } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdministratorService } from '../../services/administrator.service';
import { POSTClient } from './interface/iclient';
import { NodeService } from '../../../../shared/services/node.service';
import { Client, Country } from 'src/app/shared/interface/interfaces';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [MessageService]
})
export class ClientsComponent {
  items: MenuItem[] =[];
  titulos: string[] = [];
  ltsClientes: Client[] = [];
  clientDialog: boolean = false;
  titleModal:string='';
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
  selectedClient: Client = {
    firstname: '',
    lastname: '',
    document: '',
    phone: '',
    email: '',
    status: 0,
    country_id: 0
  };

  //Form Client
  countries: SelectItem[] = [];
  selectedEstado: string | undefined;
  //Confirm Dialog
  msgs: Message[] = [];

  constructor(
    private administratorService:AdministratorService,
    private nodeService:NodeService,
    private messageService: MessageService
    
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
    this.nodeService.getCountry().then((paises:Country[])=>{
      paises.forEach(e => {
        this.countries.push({ label: e.name, value: e.id });
      });
    })
    //Confirmation Dialog
    //this.primengConfig.ripple=true;
  }
  
  getClient(){
    this.administratorService.getClients().then((clientes) => {
      if(clientes!=null || clientes.length >0){
      this.ltsClientes =clientes;
      this.ltsClientes.forEach(e=>{
        e.countryName= e.country?.name;
      })
      
      console.log("LISTA CLIENTES", this.ltsClientes);
      }else{
        console.log("FALLO BUSCAR CLIENTE");
        
      }
    });
  }

  abrirModal(operacion:string){
    switch(operacion){
      case "NUEVO":
        this.titleModal = operacion + ' CLIENTE';
        this.clientDialog = true;
        this.POSTclient = {
          firstname: '',
          lastname: '',
          document: '',
          phone: '',
          email: '',
          status: 0,
          country_id: 0,
        };
        break;
      case "EDITAR":
        this.titleModal = operacion + ' CLIENTE';
        this.clientDialog = true;
        console.log(this.POSTclient);
        
        break;
        case "VER":
          this.titleModal = operacion + ' CLIENTE';
          this.clientDialog = true;
          break;
    }
    
  }
  coreGuardar(operacion:string){

    switch(operacion){
      case 'NUEVO CLIENTE':
        this.posClient();
        break;
      case 'EDITAR CLIENTE':
        this.putClient();
    }
  }
  posClient(){
    this.POSTclient.status = 1;
    if(this.POSTclient.document.length >8 || this.POSTclient.document != '')
    {
    this.administratorService.postClients(this.POSTclient).then((response) => {
      if(response!=null || response.length >0){
      
      console.log("RESPUESTA", response);
      this.getClient();
      this.clientDialog = false;
      this.showSuccess('success','success', 'Se registro al nuevo cliente.')
      }else{
        console.log("FALLO INSERTAR CLIENTE");
        this.showSuccess('Error','Error', 'No se pudo registrar al cliente.')
      }
    });}else{
      this.showSuccess('error','error', 'Datos incorrectos.')

    }
  }
  putClient(){
    this.POSTclient.status = 1;
    if(this.POSTclient.document == null){
      this.showSuccess('error','error', 'Datos incorrectos.');
      return;
    }
    if(this.POSTclient.document.length >8 || this.POSTclient.document != '' ||this.POSTclient.document != null)
    {
    this.administratorService.putClients(this.POSTclient).then((response) => {
      if(response!=null || response.length >0){
      
      console.log("RESPUESTA", response);
      this.getClient();
      this.clientDialog = false;
      this.showSuccess('success','success',`Se Actualizo al cliente ${this.client.lastname}.`)
      }else{
        console.log("FALLO INSERTAR CLIENTE");
        this.showSuccess('Error','Error', 'No se pudo registrar al cliente.')
      }
    });}else{
      this.showSuccess('error','error', 'Datos incorrectos.')

    }
  }
showSuccess(type:string,title:string,msg:string) {
        this.messageService.add({severity:type, summary: title, detail: msg});
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

