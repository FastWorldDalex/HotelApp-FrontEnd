import { Component, OnInit } from '@angular/core';
import { co } from '@fullcalendar/core/internal-common';
import { MessageService, SelectItem } from 'primeng/api';
import { Client } from 'src/app/modules/administrator/pages/clients/interface/iclient';
import { AdminService } from '../../../../../../../../services/admin.service';
import {  CalendarService } from '../../../../../../../../services/calendar.service';
import { Reserva, Room, POSTReserva, Accounting_Document, Email } from '../../interface/ireserva';

@Component({
  selector: 'app-new-reservation',
  templateUrl: './new-reservation.component.html',
  styleUrls: ['./new-reservation.component.scss']
})
export class NewReservationComponent implements OnInit{
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
  rooms: any[] = [];
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
    private adminService: AdminService,
    private calendarService: CalendarService,
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
        this.isEdit = true;
        this.client = new Client();
        this.reserva = new Reserva();
        this.accounting_document = new Accounting_Document();

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
    this.adminService.getClients(null, null, null).then((res: any[]) => {
      if (res != null) {

        res.forEach(client => {
          this.ltsClientes.push({ label: `${client.firstname} ${client.lastname}`, value: client.id });
        });

      }
    });
  }

  getRooms() {
    this.calendarService.GetRoom().then((res: any[]) => {
      if (res != null) {

        res.forEach(room => {
          this.ltsRooms.push({ label: room.name, value: room.id });
          this.rooms.push({ id: room.id, name: room.name, price: room.price });
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
      subtotal: this.reserva.subtotal,
      additional_amount: this.reserva.additional_amount,
      observations: this.reserva.observations,
      total: this.reserva.total,
      done_payment: this.reserva.done_payment,
      pending_payment: this.reserva.pending_payment,
      status: this.reserva.status,
      client_id: this.reserva.client_id,
      room_id: this.reserva.room_id
    }
    const resp_Reserva: POSTReserva = await this.calendarService.PostReservation(POSTReserva);
    if (resp_Reserva != null  && resp_Reserva.status != 400) {
      this.isDisplay = false;
      console.log("Reservaaa", resp_Reserva);

      if (this.accounting_document.client_name!="" && this.accounting_document.client_address!=""){
        this.accounting_document.reservation_id = await resp_Reserva.id;
        this.accounting_document.status = await 1;

        let emision: string = await `${this.accounting_document.issue_date.getFullYear()}-${this.accounting_document.issue_date.getMonth() + 1}-${this.accounting_document.issue_date.getDate()}`;
        this.accounting_document.issue_date = await emision;

        const resp_account_document: any = await this.calendarService.PostAccounting_Document(this.accounting_document);
        if (resp_account_document != null) {
          console.log("Pagooo", resp_account_document);
          this.isDisplay = false;
          this.sendEmail(resp_Reserva.id);
          this.showSuccess('success', 'success', `Se registro al informacion de ${this.accounting_document.number}.`)
        } else {
          console.log("FALLO INSERTAR INFO_PAGO");
          this.showSuccess('Error', 'Error', 'No se pudo registrar la información de pago.');
        }
      }else{
        console.log("Pagooo", this.accounting_document);
        this.showSuccess('info', 'info', 'Se registro la reserva sin pago.');
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
      subtotal: this.reserva.subtotal,
      additional_amount: this.reserva.additional_amount,
      observations: this.reserva.observations,
      total: this.reserva.total,
      done_payment: this.reserva.done_payment,
      pending_payment: this.reserva.pending_payment,
      status: this.reserva.status,
      client_id: this.reserva.client_id,
      room_id: this.reserva.room_id
    };
    const resp_Reserva:any = await this.calendarService.PutReservation(POSTReserva);
    if (resp_Reserva != null  && resp_Reserva.status != 400) {
      this.isDisplay = false;
        console.log("Reservaaa", resp_Reserva);
        this.accounting_document.reservation_id = await resp_Reserva.id;
        this.accounting_document.status = await 1;
        let emision: string = await `${this.accounting_document.issue_date.getFullYear()}-${this.accounting_document.issue_date.getMonth() + 1}-${this.accounting_document.issue_date.getDate()}`;
        this.accounting_document.issue_date = await emision;
        let resp_account_document: any;
        if(this.accounting_document != null && this.accounting_document.id != 0){
          resp_account_document = await this.calendarService.PutAccounting_Document(this.accounting_document);
        }else {
          resp_account_document = await this.calendarService.PostAccounting_Document(this.accounting_document);
        }
        console.log("entrooo");
        if (resp_account_document != null) {
          console.log("Pagooo", resp_account_document);
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
    const resp_Email:any =await this.calendarService.sendEmail(email);
    console.log("EMAIL",resp_Email);

    this.showSuccess('success', 'success', `${resp_Email.detail}`);
  }

  async getPdf(id:number){
    const resp_pdf:any = await this.calendarService.GetReservationPDF(id);
    console.log("PDF", resp_pdf);
    if(resp_pdf.status != 400){
      window.open(resp_pdf.detail, "_blank");
    } else{
      this.showSuccess('error', 'error', `${resp_pdf.error.detail}.`);
    }

  }
  //Pagos
  putAccounting_Document() {
    this.accounting_document.reservation_id = this.reserva.id;
    if (this.accounting_document.client_number == null) {
      this.showSuccess('error', 'error', 'Datos incorrectos.');
      return;
    }
    if (this.accounting_document.client_number.length > 11 || this.accounting_document.client_name != '') {
      this.calendarService.PutAccounting_Document(this.accounting_document).then((response) => {
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
    this.accounting_document.tax = ((18 / 100) * this.accounting_document.total_sale);
    this.accounting_document.total_sale = this.reserva.total;
    this.accounting_document.total = this.accounting_document.tax  + this.accounting_document.total_sale;
  }
  calculateAmounts() {
    this.reserva.total = this.reserva.subtotal + this.reserva.additional_amount;
    this.reserva.pending_payment = this.reserva.total - this.reserva.done_payment;
  }
  changeAdditionalAmount() {
    this.calculateAmounts();
  }
  automaticTotal() {
    this.rooms.map((room) => {
      if(room.id == this.reserva.room_id){
        this.reserva.subtotal = room.price;
        this.calculateAmounts();
      }
    });

  }
  automaticPago() {
    this.accounting_document.tax = ((18 / 100) * this.accounting_document.total_sale);
    this.accounting_document.total = this.accounting_document.tax + this.accounting_document.total_sale;
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
