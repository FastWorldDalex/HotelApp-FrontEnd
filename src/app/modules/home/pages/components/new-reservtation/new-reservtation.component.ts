import { Component, OnInit } from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { Client } from 'src/app/modules/administrator/pages/clients/interface/iclient';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { HomeService } from '../../../services/home.service';
import { Reserva, Room, POSTReserva } from '../../interfaces/ireserva';

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
  //[{
  //  label: 'ACTIVO',
  //  value: 1,
  //},{
  //  label: 'INACTIVO',
  //  value: 0,
  //}];
  constructor(
    private administratorService: AdministratorService,
    private homeService: HomeService
  ) {
    this.client = new Client();
    this.reserva = new Reserva();
  }

  ngOnInit() {
    const p1 = this.getClients();
    const p2 = this.getRooms();
    Promise.all([p1, p2]).then((res) => {

    });

  }
  componentsInitials(_accion: string, _titulo: string, _data?: any): void {
    this.accion = _accion;
    this.titulo = `${_accion} ${_titulo}`;
    this.isDisplay = true;
    this.isNew = true;
    this.isEdit = false;



    switch(_accion){
      case 'NUEVA':
        this.client = new Client();
        this.reserva = new Reserva();
        break;
      case 'EDITAR':
        console.log(_data);
        
        this.reserva =_data;
        this.reserva.checkout = new Date(_data.checkout);
        this.reserva.checkin = new Date(_data.checkin);
        break;
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

  posReserva() {
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
    this.homeService.PostReservation(POSTReserva).then((response) => {
      if (response != null) {
        console.log(response);
        this.isDisplay = false;
        /*setTimeout(() => {
          this.getReservas();
        }, 1000);
        setTimeout(() => {
          this.updateCalendar();
        }, 2000);*/
      }
    })
  }
}
