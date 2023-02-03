import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
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

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek', // dayGridWeek
    initialDate: '2023-01-30',
    locale: esLocale,
     headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: ''
    },
    eventContent: function (info) {
      return { html: '<div class="event-content">' + info.event.title + '</div>' };
    },
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

  ltsReservas: Reserva[] = [];
  reservaFiltro: labelCalendar = {
      title: '',
      start: '',
      end: ''
  };
  calendarEvents: any[] = [];
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
    private administratorService:AdministratorService,
    private changeDetector: ChangeDetectorRef) { }

  ngOnInit() {
    setTimeout(() => {
      this.getReservas();
    }, 1000);
    setTimeout(() => {
      this.updateCalendar();
    }, 2000);

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

    /*this.options = {
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
          events: this.calendarEvents,

          backgroundColor: '#2962FF',
          //color: 'blue',     // an option!
          textColor: 'white' // an option!
        }
      ],
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
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
    };*/

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

  updateCalendar(){
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek', // dayGridWeek
      initialDate: '2023-01-30',
      locale: esLocale,
       headerToolbar: {
        left: 'prev,next today',
        center: 'title',
        right: ''
      },
      dateClick: this.handleDateClick.bind(this),
      eventSources: [
        // your event source
        {
          events: this.calendarEvents,

          backgroundColor: '#2962FF',
          //color: 'blue',     // an option!
          textColor: 'white' // an option!
        }
      ],
      eventClick: this.handleEventClick.bind(this),
      eventsSet: this.handleEvents.bind(this),
      eventContent: function (info) {
        return { html: '<div class="event-content">' + info.event.title + '</div>' };
      },
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
  }

  handleEventClick(clickInfo: EventClickArg) {
    this.showReservaDialog();
  }

  handleDateClick(date: any) {
    console.log(date.dateStr);
    this.showReservaDialog();

    this.calendarEvents = [ // put the array in the `events` property
      {
        title: '<span>Juan Prado</span> <br>+51966710491 <br> carlaprado@gmail.com <br> 1 adulto - 0 niños',
        start: '2023-01-18T00:00:00',
        end: '2023-01-18T01:00:00',
      },
      {
        title: '<span>Juana Villa</span> <br>  +51966710491 <br> carmenvilla@gmail.com <br> 2 adultos - 0 niños',
        start: '2023-01-20T02:00:00',
        end: '2023-01-20T03:00:00',
      }
    ];

    this.currentEvents = this.calendarEvents;

  }

  handleEvents(events: EventApi[]) {
    console.log("handleEvents");
    this.events = [ // put the array in the `events` property
      {
        title: '<span>Juan Prado</span> <br>+51966710491 <br> carlaprado@gmail.com <br> 1 adulto - 0 niños',
        start: '2023-01-18T00:00:00',
        end: '2023-01-18T01:00:00',
      },
      {
        title: '<span>Juana Villa</span> <br>  +51966710491 <br> carmenvilla@gmail.com <br> 2 adultos - 0 niños',
        start: '2023-01-20T02:00:00',
        end: '2023-01-20T03:00:00',
      }
    ];
    this.currentEvents = events;
    this.changeDetector.detectChanges();
  }
  //Form Reserva
  showReservaDialog() {
    this.reservaDialog = true;
  }

  getReservas() {
    this.homeService.GetReservation(null, null).then((reservas) => {
      if (reservas != null || reservas.length > 0) {
        this.ltsReservas = reservas;
        let cliente: string;
        let room_start: string;
        let room_end: string;
        this.calendarEvents = [];
        this.ltsReservas.forEach(element => {
          cliente = element.client.firstname + ' ' + element.client.lastname;
          switch(element.room.name){
            case 'H101':
              room_start = "00:00:00";
              room_end = "01:00:00";
              break;
              case 'H102':
                room_start = "01:00:00";
                room_end = "02:00:00";
                break;
              case 'H104':
                room_start = "02:00:00";
                room_end = "03:00:00";
                break;
              case 'H105':
                room_start = "03:00:00";
                room_end = "04:00:00";
                break;
              case 'H106':
                room_start = "04:00:00";
                room_end = "05:00:00";
                break;
              case 'H107':
                room_start = "05:00:00";
                room_end = "06:00:00";
                break;
              case 'H108':
                room_start = "06:00:00";
                room_end = "07:00:00";
                break;
              case 'H109':
                room_start = "07:00:00";
                room_end = "08:00:00";
                break;
              case 'H109':
                room_start = "08:00:00";
                room_end = "09:00:00";
                break;
              case 'H110':
                room_start = "09:00:00";
                room_end = "10:00:00";
                break;
              case 'H111':
                room_start = "09:00:00";
                room_end = "10:00:00";
                break;
              case 'H112':
                room_start = "10:00:00";
                room_end = "11:00:00";
                break;
              case 'H113':
                room_start = "11:00:00";
                room_end = "12:00:00";
                break;
              case 'H114':
                room_start = "12:00:00";
                room_end = "13:00:00";
                break;
              case 'H115':
                room_start = "13:00:00";
                room_end = "14:00:00";
                break;
              case 'H116':
                room_start = "14:00:00";
                room_end = "15:00:00";
                break;
              case 'H117':
                room_start = "15:00:00";
                room_end = "16:00:00";
                break;
              case 'H118':
                room_start = "16:00:00";
                room_end = "17:00:00";
                break;
              case 'H119':
                room_start = "17:00:00";
                room_end = "18:00:00";
                break;
              case 'H120':
                room_start = "18:00:00";
                room_end = "19:00:00";
                break;
              case 'H121':
                room_start = "19:00:00";
                room_end = "20:00:00";
                break;
              case 'H122':
                room_start = "20:00:00";
                room_end = "21:00:00";
                break;
          }

          let reservaFiltro = {
            title: `<span>${cliente}</span> <br> ${element.client.phone} <br>
            ${element.client.email} <br> ${element.adults} adulto(s) - ${element.children} niño(s)`,
            start: `${element.checkin}T${room_start}`,
            end: `${element.checkout}T${room_end}`
          }

          this.calendarEvents.push(reservaFiltro);
        });
      }
    });
  }

  getReservas2() {
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
        setTimeout(() => {
          this.getReservas();
        }, 1000);
        setTimeout(() => {
          this.updateCalendar();
        }, 2000);
      }
    })
  }
}

export interface labelCalendar{
  title: string,
  start: string,
  end: string,
}
