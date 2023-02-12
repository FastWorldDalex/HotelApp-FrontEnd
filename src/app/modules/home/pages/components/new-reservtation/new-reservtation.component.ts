import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Client } from 'src/app/modules/administrator/pages/clients/interface/iclient';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { HomeService } from '../../../services/home.service';
import { Reserva, Room, POSTReserva, Accounting_Document, Email } from '../../interfaces/ireserva';

@Component({
  selector: 'app-new-reservtation',
  templateUrl: './new-reservtation.component.html',
  styleUrls: ['./new-reservtation.component.scss']
})
export class NewReservtationComponent implements OnInit {
  accion: string = '';
  titulo: string = '';
  isDisplay: boolean = false;
  isEdit: boolean = false;
  isNew: boolean = false;
  eventHtpp: boolean = false;
  client: Client;
  reserva: Reserva
  Estados?: SelectItem;
  ltsClientes: SelectItem[] = [];
  ltsRooms: SelectItem[] = [];
  accounting_document: Accounting_Document;

  ltsCurrency: SelectItem[] = [{
    label: 'SOL',
    value: 1,
  }, {
    label: 'DOLAR',
    value: 2,
  }
  ];
  ltsType: SelectItem[] = [{
    label: 'FACTURA',
    value: 1,
  }, {
    label: 'BOLETA',
    value: 2,
  }
  ];


  constructor(
    private administratorService: AdministratorService,
    private homeService: HomeService,
    private messageService: MessageService
  ) {
    this.client = new Client();
    this.reserva = new Reserva();
    this.accounting_document = new Accounting_Document();
  }

  ngOnInit() {
    const p1 = this.getClients();
    const p2 = this.getRooms();
    Promise.all([p1, p2]).then((res) => {

    });

  }
  componentsInitials(_accion: string, _titulo: string, _reserva?: any, _pago?: any): void {
    this.accion = _accion;
    this.titulo = `${_accion} ${_titulo}`;
    this.isDisplay = true;
    this.isNew = true;
    this.isEdit = false;



    switch (_accion) {
      case 'NUEVA':
        this.client = new Client();
        this.reserva = new Reserva();
        this.accounting_document = new Accounting_Document();
        this.accounting_document.tax = 8;
        this.accounting_document.issue_date = new Date();
        break;
      case 'EDITAR':
        console.log(_reserva);
        this.reserva = _reserva;
        this.reserva.checkout = new Date(_reserva.checkout);
        this.reserva.checkin = new Date(_reserva.checkin);


        if (_pago.id != null) {
          this.accounting_document = _pago;
          this.accounting_document.issue_date = new Date(this.accounting_document.issue_date);
        } else
          if (_pago.detail != null) {
            this.message('warn', 'Advertencia', _pago.detail)
          }
        break;
      default:
        return;
    }
  }

  getClients() {
    this.administratorService.getClients().then((res: any[]) => {
      if (res != null) {

        res.forEach(client => {
          this.ltsClientes.push({ label: `${client.firstname} ${client.lastname}`, value: client.id });
        });

      }
    });
  }

  getRooms() {
    this.homeService.GetRoom().then((res: any[]) => {
      if (res != null) {

        res.forEach(room => {
          this.ltsRooms.push({ label: room.name, value: room.id });
        });

      }
    });
  }

  coreGuardar() {
    switch (this.accion) {
      case 'NUEVA':
        this.posReserva();
        break;
      case 'EDITAR':
        this.putReserva();
        break;
    }
  }

  async posReserva() {
    this.reserva.status = 1;
    let checkin: string = `${this.reserva.checkin.getFullYear()}-${this.reserva.checkin.getMonth() + 1}-${this.reserva.checkin.getDate()}`;
    this.reserva.checkin = checkin;
    let checkout: string = `${this.reserva.checkout.getFullYear()}-${this.reserva.checkout.getMonth() + 1}-${this.reserva.checkout.getDate()}`;
    this.reserva.checkout = checkout;
    console.log(this.reserva);
    let POSTReserva: POSTReserva = {
      checkin: checkin,
      checkout: checkout,
      adults: this.reserva.adults,
      children: this.reserva.children,
      total: this.reserva.total,
      done_payment: this.reserva.done_payment,
      pending_payment: this.reserva.pending_payment,
      status: this.reserva.status,
      client_id: this.reserva.client_id,
      room_id: this.reserva.room_id
    }
    const resp_Reserva: POSTReserva = await this.homeService.PostReservation(POSTReserva);
    if (resp_Reserva != null  && resp_Reserva.status != 400) {
      this.isDisplay = false;
      console.log("ISIIS", resp_Reserva);

      this.accounting_document.reservation_id = await resp_Reserva.id;
      this.accounting_document.status = await 1;

      let emision: string = await `${this.accounting_document.issue_date.getFullYear()}-${this.accounting_document.issue_date.getMonth() + 1}-${this.accounting_document.issue_date.getDate()}`;
      this.accounting_document.issue_date = await emision;

      const resp_account_document: any = await this.homeService.PostAccounting_Document(this.accounting_document);
      if (resp_account_document != null) {
        console.log("RESPUESTA", resp_account_document);
        this.isDisplay = false;
        this.sendEmail(resp_Reserva.id);
        this.showSuccess('success', 'success', `Se registro al informacion de ${this.accounting_document.number}.`)
      } else {
        console.log("FALLO INSERTAR INFO_PAGO");
        this.showSuccess('Error', 'Error', 'No se pudo registrar la información de pago.');
      }
    }else {
      this.showSuccess('Error', 'Error', 'No se puede registrar la reserva en el horario y habitación elegida');
    }
  }

  async putReserva() {
    this.reserva.status = 1;
    let checkin: string = `${this.reserva.checkin.getFullYear()}-${this.reserva.checkin.getMonth() + 1}-${this.reserva.checkin.getDate()}`;
    this.reserva.checkin = checkin;

    let checkout: string = `${this.reserva.checkout.getFullYear()}-${this.reserva.checkout.getMonth() + 1}-${this.reserva.checkout.getDate()}`;
    this.reserva.checkout = checkout;
    console.log(this.reserva);

    let POSTReserva: POSTReserva = {
      id: this.reserva.id,
      checkin: checkin,
      checkout: checkout,
      adults: this.reserva.adults,
      children: this.reserva.children,
      total: this.reserva.total,
      done_payment: this.reserva.done_payment,
      pending_payment: this.reserva.pending_payment,
      status: this.reserva.status,
      client_id: this.reserva.client_id,
      room_id: this.reserva.room_id
    };
    const resp_Reserva:any = await this.homeService.PutReservation(POSTReserva);
    if (resp_Reserva != null  && resp_Reserva.status != 400) {
      this.isDisplay = false;
        console.log("ISIIS", resp_Reserva);
        this.accounting_document.reservation_id = await resp_Reserva.id;
        this.accounting_document.status = await 1;
        let emision: string = await `${this.accounting_document.issue_date.getFullYear()}-${this.accounting_document.issue_date.getMonth() + 1}-${this.accounting_document.issue_date.getDate()}`;
        this.accounting_document.issue_date = await emision;
        const resp_account_document: any = await this.homeService.PutAccounting_Document(this.accounting_document);
        console.log("entrooo");

        if (resp_account_document != null) {
          console.log("RESPUESTA", resp_account_document);
          this.isDisplay = false;
          this.sendEmail(this.reserva.id);
          this.showSuccess('success', 'success', `Se actualizó al informacion de ${this.accounting_document.number}.`);
        } else {
          console.log("FALLO INSERTAR INFO_PAGO");
          this.showSuccess('Error', 'Error', 'No se pudo actualizar la información de pago.');
        }
    } else {
      this.showSuccess('Error', 'Error', 'No se puede registrar la reserva en el horario y habitación elegida');
    }
  }

  async sendEmail(id?:number){
    let email:Email = new Email();
    email.id = id;
    const resp_Email:any =await this.homeService.sendEmail(email);
    console.log("EMAIL",resp_Email);

    this.showSuccess('success', 'success', `${resp_Email.detail}`);
  }
  //Pagos
  putAccounting_Document() {
    this.accounting_document.reservation_id = this.reserva.id;
    if (this.accounting_document.client_number == null) {
      this.showSuccess('error', 'error', 'Datos incorrectos.');
      return;
    }
    if (this.accounting_document.client_number.length > 11 || this.accounting_document.client_name != '') {
      this.homeService.PutAccounting_Document(this.accounting_document).then((response) => {
        if (response != null || response.length > 0) {

          console.log("RESPUESTA", response);
          this.isDisplay = false;
          this.showSuccess('success', 'success', `Se actualizó al informacion de ${this.accounting_document.number}.`)
        } else {
          console.log("FALLO INSERTAR CLIENTE");
          this.showSuccess('Error', 'Error', 'No se pudo actualizar la información de pago.')
        }
      });
    } else {
      this.showSuccess('error', 'error', 'Datos incorrectos.')

    }
  }

  automaticReserva() {
    this.accounting_document.total_sale = this.reserva.total;
    this.accounting_document.total = ((this.accounting_document.tax / 100) * this.accounting_document.total_sale) + this.accounting_document.total_sale;
  }
  automaticPago() {
    this.accounting_document.total = ((this.accounting_document.tax / 100) * this.accounting_document.total_sale) + this.accounting_document.total_sale;
  }



  showSuccess(type: string, title: string, msg: string) {
    this.messageService.add({ severity: type, summary: title, detail: msg });
  }
  message(type: string, titulo: string, msg: string) {
    this.showSuccess(type, titulo, msg)
  }
  eventhttp(event: boolean) {
    this.eventHtpp = event;
  }
}
