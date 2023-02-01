import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';


// @fullcalendar plugins
import { NodeService } from 'src/app/shared/services/node.service';
import { CalendarOptions, EventClickArg, EventApi   } from '@fullcalendar/core';
//Dropdown
import { SelectItem } from 'primeng/api';
import { HomeService } from '../../../services/home.service';
import { POSTReserva, Reserva, Room } from '../../interfaces/ireserva';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { Client } from 'src/app/modules/administrator/pages/clients/interface/iclient';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: any[] = [];

  options?: CalendarOptions;
  ltsReservas: Reserva[] = [];
  reservaFiltro: labelCalendar = {
      title: '',
      start: '',
      end: ''
    };
    reservasCalendario: labelCalendar[]=[ // put the array in the `events` property
    {
      title: '<span>Carla Marin</span> <br>+51966710491 <br> carlamarin@gmail.com <br> 1 adulto - 0 niños',
      start: '2023-01-18T00:00:00',
      end: '2023-01-18T01:00:00',
    },
    {
      title: '<span>Carmen Villaverde</span> <br>  +51966710491 <br> carmenvillaverde@gmail.com <br> 2 adultos - 0 niños',
      start: '2023-01-20T02:00:00',
      end: '2023-01-20T03:00:00',
    },
    {
      title: '<span>Pedro Rivas</span> <br>  +51966744497 <br> pedrorivas@gmail.com <br> 1 adulto - 1 niño',
      start: '2023-01-21T01:00:00',
      end: '2023-01-21T02:00:00',
    }
  ]
  header: any;

  //Form Calendar
  reservaDialog: boolean = false;
  dateCheckin!: Date;
  dateCheckout!: Date;
  es: any;
  //dropdwon
  ltsClientes: Client[] = [];
  ltsRooms: Room[] = [];
  //defaultValues
  value1: number = 5;
  value2: number = 1200;
  postReserva:POSTReserva = {
    checkin: '',
    checkout: '',
    adults: 0,
    children: 0,
    total: 0,
    done_payment: 0,
    pending_payment: 0,
    status: 0,
    client_id: 0,
    room_id: 0
  }
  constructor(private nodeService: NodeService,
    private homeService: HomeService,
    private administratorService:AdministratorService) { }

  ngOnInit() {
    /*this.nodeService.getEvents().then((events) => {
        this.events = events;
        this.options = { ...this.options, ...{ events: events } };
    });*/
    this.administratorService.getClients().then((res)=>{
      if(res!= null || res.length>0){

        this.ltsClientes = res;
        this.ltsClientes.forEach((element) =>{
          element.nameComplete = element.firstname + ' '+element.lastname;
        });
      }
    });

    this.homeService.GetRoom().then((res)=>{
      if(res!= null || res.length>0){
        this.ltsRooms = res;
      }
    });


    this.getReservas();
    this.options = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek', // dayGridWeek
      initialDate: '2023-01-18',
      locale: esLocale,
      dateClick: this.handleDateClick.bind(this),
      headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      eventSources: [

        // your event source
        {
          events: this.reservasCalendario,

          backgroundColor: '#2962FF',
          //color: 'blue',     // an option!
          textColor: 'white' // an option!
        }
      ],
      eventClick: this.handleEventClick.bind(this),
      eventContent: function (info) {
        return { html: '<div class="event-content">' + info.event.title + '</div>' };
      },
      //eventShortHeight: 60,
      //slotEventOverlap: true,
      slotLabelContent: function (slot) {
        var rooms = ["H101", "H102", "H104", "H105", "H106", "H107", "H108", "H109",
          "H110", "H111", "H112", "H113", "H114", "H115", "H116", "H117", "H118", "H119",
          "H120", "H121", "H122", "", "", ""];
        var room_title = "";
        if (slot.date.getMinutes() == 0) {
          room_title = '<b>' + rooms[slot.date.getHours()] + '<b>';
        } else if (slot.date.getMinutes() == 15) {
          room_title = "Habitación Básica";
        } else if (slot.date.getMinutes() == 30) {
          room_title = "2 camas simples";
        } else {
          room_title = "1er piso";
        }
        return { html: '<span style="font-size:11px">' + room_title + '</span>' };
      },
      slotLabelInterval: "00:15",
      slotDuration: '00:15:00',
      nowIndicator: true,
      allDaySlot: false,
      editable: true,
      selectable: true,
      selectMirror: true,
      dayMaxEvents: true
    };

    //Form Calendar
    this.es = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"],
      dayNamesShort: ["dom", "lun", "mar", "mié", "jue", "vie", "sáb"],
      dayNamesMin: ["D", "L", "M", "X", "J", "V", "S"],
      monthNames: ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"],
      monthNamesShort: ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"],
      today: 'Hoy',
      clear: 'Borrar'
    }
    //dropdown
  }
  currentEvents: EventApi[] = [];

  handleEventClick(clickInfo: EventClickArg) {
    this.showReservaDialog();
  }

  handleDateClick() {
    this.showReservaDialog();
  }

  handleEvents(events: EventApi[]) {
    console.log(events);
    this.currentEvents = events;
    //this.changeDetector.detectChanges();
  }
  //Form Reserva
  showReservaDialog() {
    this.reservaDialog = true;
  }

  getReservas() {
    this.homeService.GetReservation(null, null).then((reservas) => {
      if (reservas != null || reservas.length > 0) {
        this.ltsReservas = reservas;
        console.log(this.ltsReservas)
        let cliente: string;
        this.ltsReservas.forEach((element) => {
          cliente = element.client.firstname.split(' ')[0] + ' ' + element.client.lastname.split(' ')[0];
          this.reservaFiltro = {
            title: `<span>${cliente}</span>'+
            ' <br>  ${element.client.phone} <br>' +
            '${element.client.email} <br> ${element.adults} adulto(s) - ${element.children} niño(s)`,
            start: `${element.checkin}T02:00:00`,
            end: `${element.checkout}T03:00:00`
          }
          console.log(this.reservaFiltro);

          this.reservasCalendario.push(this.reservaFiltro);
        });


      }
    });
  }


  posReserva() {
    this.postReserva.room_id= this.postReserva.room_id.id;
    this.postReserva.client_id =this.postReserva.client_id.id;
    this.postReserva.status =1;
    let checkin:string = `${this.postReserva.checkin.getFullYear()}-${this.postReserva.checkin.getMonth()+1}-${this.postReserva.checkin.getDate()}`;
    this.postReserva.checkin = checkin;

    let checkout:string = `${this.postReserva.checkout.getFullYear()}-${this.postReserva.checkout.getMonth()+1}-${this.postReserva.checkout.getDate()}`;
    this.postReserva.checkout = checkout;

    this.homeService.PostReservation(this.postReserva).then((response) =>{
      if(response != null){
        console.log(response);
        this.reservaDialog=false;
        this.getReservas();
      }
    })
  }
}

export interface labelCalendar{
  title: string,
  start: string,
  end: string,
}
