import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';


// @fullcalendar plugins
import { NodeService } from 'src/app/shared/services/node.service';
import { CalendarOptions, EventClickArg, EventApi } from '@fullcalendar/core';
//Dropdown
import { Message, MessageService, SelectItem } from 'primeng/api';
import { HomeService } from '../../../services/home.service';
import { Accounting_Document, POSTReserva, Reserva, Room, ClosedSchedule } from '../../interfaces/ireserva';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { Client } from 'src/app/modules/administrator/pages/clients/interface/iclient';
import { NewReservtationComponent } from '../new-reservtation/new-reservtation.component';
import { ClosedDateComponent } from '../closed-date/closed-date.component';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  providers: [MessageService]
})
export class CalendarComponent implements OnInit {

  @ViewChild(NewReservtationComponent, { static: false })
  newReservtationComponent: NewReservtationComponent =
    new NewReservtationComponent(this.administratorService,
      this.homeService, this.messageService);

  @ViewChild(ClosedDateComponent, { static: false })
  closedDateComponent: ClosedDateComponent =
    new ClosedDateComponent(this.homeService, this.messageService);

  events: any[] = [];
  msgs: Message[] = [];

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'timeGridWeek', // dayGridWeek
    initialDate: '2023-02-20',
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
  ltsClosedSchedules: ClosedSchedule[] = [];
  reservaFiltro: labelCalendar = {
    title: '',
    start: '',
    end: ''
  };
  calendarEvents: any[] = [];
  header: any;

  Reservation: Reserva = new Reserva();
  //Form Calendar
  reservaDialog: boolean = false;
  dateCheckin!: Date;
  dateCheckout!: Date;
  es: any;
  //dropdwon


  //defaultValues
  value1: number = 5;
  value2: number = 1200;
  postReserva: POSTReserva = {
    checkin: '',
    checkout: '',
    adults: 0,
    children: 0,
    subtotal: 0,
    additional_amount: 0,
    observations: '',
    total: 0,
    done_payment: 0,
    pending_payment: 0,
    status: 0,
    client_id: 0,
    room_id: 0
  }
  constructor(private nodeService: NodeService,
    private homeService: HomeService,
    private administratorService: AdministratorService,
    private messageService: MessageService,
    private changeDetector: ChangeDetectorRef
    ) { }

  ngOnInit() {
    setTimeout(() => {
      this.getReservas();
    }, 1000);
    setTimeout(() => {
      this.updateCalendar();
    }, 2000);

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

  updateCalendar() {
    this.calendarOptions = {
      plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
      initialView: 'timeGridWeek', // dayGridWeek
      initialDate: '2023-02-20',
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

  //seleccionar reserva
  async handleEventClick(clickInfo: EventClickArg) {
    /**
    let vTrae: any = (clickInfo.jsEvent.srcElement as HTMLInputElement).getElementsByClassName('id').item(0);
    let Element: string = vTrae.outerHTML;
    console.log("ELEMENT", Element)
    console.log(clickInfo.jsEvent.srcElement);
    console.log(vTrae.outerHTML);

    let ArrayElement1: any[] = Element.split('>');
    console.log(ArrayElement1);

    let ArrayElement2: string[] = ArrayElement1[1].split('<');
    console.log(ArrayElement1);

    let ArrayElement3: Accounting_Document[] = ArrayElement1[1].split('<');
    console.log(ArrayElement1);

    //ID DE RESERVA
    let id_Reservation: number = Number(ArrayElement2[0].toString());


    //let acc: Accounting_Document = ArrayElement3[0];**/

    let id_Reservation = parseInt(clickInfo.event.id);

    if(id_Reservation != 0){
      this.coreNuevo();
      let reserva:Reserva = await this.homeService.GetReservationId(id_Reservation);
      if (reserva != null) {
        let pago:Accounting_Document = await this.homeService.GetReservationAcc(reserva.id);
        console.log("pago");
        console.log(pago);
        console.log("reserva.checkin - "+ reserva.checkin);
        this.newReservtationComponent.componentsInitials('EDITAR','RESERVA',reserva,pago);
      }

      console.log(id_Reservation);
    }else {
      console.log("Date blocked");
    }

  }

  //seleccionar cuadro de reserva
  handleDateClick(date: any) {
    console.log(date.dateStr);
    this.coreNuevo();

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

  //Asignar data
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
  coreNuevo() {
    this.newReservtationComponent.componentsInitials('NUEVA','RESERVA', null, null);
  }

  //Form Cerrar Cupos
  openCerrarCupos() {
    this.closedDateComponent.componentsInitials();
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
          switch (element.room.name) {
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
            case 'H110':
              room_start = "08:00:00";
              room_end = "09:00:00";
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
            case 'H123':
              room_start = "21:00:00";
              room_end = "22:00:00";
              break;
          }
          let reservaFiltro = {
            id: `${element.id}`,
            title: `<span class="id" style="display:none;">${element.id}</span> <span>${cliente}</span> <br> ${element.client.phone} <br>
            ${element.client.email} <br> ${element.adults} adulto(s) - ${element.children} niño(s)`,
            start: `${element.checkin}T${room_start}`,
            end: `${element.checkout}T${room_end}`
          }

          this.calendarEvents.push(reservaFiltro);
        });

        this.getClosedHours();

        this.message('success', 'exitoso', 'Busqueda realizada.')
      }else{
        this.message('error', 'error', 'Busqueda fallida.')
      }
    });
  }

  getClosedHours(){
    this.homeService.GetClosedSchedule().then((closed_schedules) => {
      if (closed_schedules != null || closed_schedules.length > 0) {
        this.ltsClosedSchedules = closed_schedules;
        let room_start: string;
        let room_end: string;
        this.ltsClosedSchedules.forEach(element => {
          switch (element.room.name) {
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
            case 'H110':
              room_start = "08:00:00";
              room_end = "09:00:00";
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
            case 'H123':
              room_start = "21:00:00";
              room_end = "22:00:00";
              break;
          }

          let ClosedScheduleFiltro = {
            id: 0,
            title: `<span class="id" style="display:none;">0</span> <span>${element.description}</span> `,
            start: `${element.start_date}T${room_start}`,
            end: `${element.end_date}T${room_end}`,
            backgroundColor: '#6b6b6b',
            borderColor: '#6b6b6b',
          }

          this.calendarEvents.push(ClosedScheduleFiltro);

        });
      }
    });

  }

  showSuccess(type:string,title:string,msg:string) {
    this.messageService.add({severity:type, summary: title, detail: msg});
  }
  message(type:string, titulo:string, msg:string){
    this.showSuccess(type,titulo, msg)
  }
}

export interface labelCalendar {
  title: string,
  start: string,
  end: string,
}
