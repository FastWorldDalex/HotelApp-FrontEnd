import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin ,{ Draggable }from '@fullcalendar/interaction';
import esLocale from '@fullcalendar/core/locales/es';


// @fullcalendar plugins
import { NodeService } from 'src/app/shared/services/node.service';
import { CalendarOptions } from '@fullcalendar/core';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  events: any[]=[];

  options?: CalendarOptions ;

  header: any;
  constructor(private nodeService: NodeService) {}

  ngOnInit() {
      /*this.nodeService.getEvents().then((events) => {
          this.events = events;
          this.options = { ...this.options, ...{ events: events } };
      });*/

      this.options = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialView: 'timeGridWeek', // dayGridWeek
          initialDate: '2023-01-18',
          locale:esLocale,
          headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: ''
          },
          eventSources: [

            // your event source
              {
                events: [ // put the array in the `events` property
                  {
                    title  : '<span>Carla Marin</span> <br>+51966710491 <br> carlamarin@gmail.com <br> 1 adulto - 0 niños',
                    start  : '2023-01-18T00:00:00',
                    end  : '2023-01-18T01:00:00',
                  },
                  {
                    title  : '<span>Carmen Villaverde</span> <br>  +51966710491 <br> carmenvillaverde@gmail.com <br> 2 adultos - 0 niños',
                    start  : '2023-01-20T02:00:00',
                    end  : '2023-01-20T03:00:00',
                  },
                  {
                    title  : '<span>Pedro Rivas</span> <br>  +51966744497 <br> pedrorivas@gmail.com <br> 1 adulto - 1 niño',
                    start  : '2023-01-21T01:00:00',
                    end  : '2023-01-21T02:00:00',
                  }
                ],

                backgroundColor: '#2962FF',
                //color: 'blue',     // an option!
                textColor: 'white' // an option!
              }
            ],
            eventContent: function(info) {
              return {html: '<div class="event-content">' + info.event.title + '</div>'};
            },
          //eventShortHeight: 60,
          //slotEventOverlap: true,
          slotLabelContent : function(slot){
            var rooms = ["H101","H102","H104","H105","H106","H107", "H108","H109",
              "H110","H111","H112","H113","H114","H115","H116","H117","H118","H119",
              "H120","H121","H122","","",""];
            var room_title = "";
            if(slot.date.getMinutes() == 0){
              room_title = '<b>'+rooms[slot.date.getHours()]+'<b>';
            }else if(slot.date.getMinutes() == 15){
              room_title = "Habitación Básica";
            }else if(slot.date.getMinutes() == 30){
              room_title = "2 camas simples";
            }else{
              room_title = "1er piso";
            }
            return {html: '<span style="font-size:11px">'+room_title+'</span>'};
          },
          slotLabelInterval:"00:15",
          slotDuration: '00:15:00',
          nowIndicator: true,
          allDaySlot: false,
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true
      };
  }
}
