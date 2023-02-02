import { Component, ViewChild, OnInit } from '@angular/core';
import { ConfirmationService, MenuItem, Message, MessageService, PrimeNGConfig, SelectItem } from 'primeng/api';
import { Table } from 'primeng/table';
import { AdministratorService } from '../../services/administrator.service';
import { NodeService } from '../../../../shared/services/node.service';
import { Country, Titles } from 'src/app/shared/interface/interfaces';
import { Client } from './interface/iclient';
import { NewClientsComponent } from './components/new-clients/new-clients.component';



@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss'],
  providers: [MessageService]
})
export class ClientsComponent implements OnInit{
  @ViewChild(NewClientsComponent, { static: false })
  newClientsComponent: NewClientsComponent = new NewClientsComponent(this.nodeService,this.administratorService,this.messageService);

  items: MenuItem[] =[];
  titulos: Titles[] = [];
  ltsClientes: Client[] = [];
  clientDialog: boolean = false;
  titleModal:string='';
  puedeEditar:boolean = false;
  client: Client;
  selectedClient: Client = {
    firstname: '',
    lastname: '',
    document: '',
    phone: '',
    email: '',
    status: 0,
    country_id: 0,
    country_name: ''
  };

  //Form Client
  countries: SelectItem[] = [];
  lstEstado: SelectItem[] = [];
  selectedEstado: string | undefined;
  //Confirm Dialog
  msgs: Message[] = [];
  constructor(
    private administratorService:AdministratorService,
    private nodeService:NodeService,
    private messageService: MessageService
    
  ) {
    this.client = new Client();
    console.log(this.client);
    
  }
  //private confirmationService: ConfirmationService, private primengConfig: PrimeNGConfig

  ngOnInit() {

    const carga_1 = this.getClient();
    const carga_2 = this.getCountry();
    const carga_3 = this.componentsInitials();
    
    Promise.all([carga_1,carga_2,carga_3]).then((resp)=>{

    });
  }
  
  getClient(){
    this.administratorService.getClients().then((clientes) => {
      if(clientes!=null || clientes.length >0){

      this.ltsClientes =clientes;
      this.ltsClientes.forEach((e)=>{
        e.country_name = e.country?.name;
      });
      this.message('success', 'exitoso', 'Busqueda realizada.')
      }else{
        this.message('error', 'error', 'Busqueda fallida.')
      }
    });
  }
  getCountry(){
    this.nodeService.getCountry().then((paises:Country[])=>{
      paises.forEach(e => {
        this.countries.push({ label: e.name, value: e.id });
      });
    })
  }
  coreNuevo(accion:string){
    
    this.newClientsComponent.componentsInitials(accion,"CLIENTE");
  }
  coreEditar(accion:string, client: Client){
    
    this.newClientsComponent.componentsInitials(accion,"CLIENTE", client);
  }
  coreVer(accion:string, client: Client){
    
    this.newClientsComponent.componentsInitials(accion,"CLIENTE",client);
  }


  abrirModal(operacion:string){
    switch(operacion){
      case "NUEVO":
        
        this.titleModal = operacion + ' CLIENTE';
        this.clientDialog = true;
        break;
      case "EDITAR":
        this.titleModal = operacion + ' CLIENTE';
        this.clientDialog = true;
        console.log(this.client);
        this.puedeEditar = false;
        break;
        case "VER":
          this.titleModal = operacion + ' CLIENTE';
          this.clientDialog = true;
          this.puedeEditar = true;
          break;
    }
  }

  


  deleteClient(client: Client){
    this.administratorService.deleteClients(client.id).then((response) => {
      if(response!=null || response.length >0){
      
      console.log("RESPUESTA", response);
      this.getClient();
      this.clientDialog = false;
      this.showSuccess('success','success',`Se elimino al cliente ${client.lastname}.`)
      }else{
        console.log("FALLO INSERTAR CLIENTE");
        this.showSuccess('Error','Error', 'No se pudo eliminar al cliente.')
      }
    });
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

componentsInitials(){
  this.titulos = [
    {title: '#', width: 2},
    {title: 'Nombres', width: 2},
    {title: 'Apellidos', width: 2},
    {title: 'Documento', width: 2},
    {title: 'Teléfono', width: 2},
    {title: 'Email', width: 2},
    {title: 'País', width: 2},
    {title: 'Cantidad de Reservas', width: 2},
    {title: 'Última Reserva', width: 2},
    {title: 'Fecha de Creación', width: 2},
    {title: 'Estado', width: 2},
    {title: 'Acciones', width: 2}
  ];

  this.items = [
    {label: 'Ver detalle', icon: 'pi pi-eye', command: ()=>this.abrirModal("VER")},
    {label: 'Editar', icon: 'pi pi-file-edit', command: ()=>this.abrirModal("EDITAR") },
    {label: 'Eliminar', icon: 'pi pi-trash', routerLink: ['/auth/login']},
    {label: 'Desactivar', icon: 'pi pi-check-square', routerLink: ['/auth/login']}
];
}

message(type:string, titulo:string, msg:string){
  this.showSuccess(type,titulo, msg)
}
}


