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
      this.nodeService.getEvents().then((events) => {
          this.events = events;
          this.options = { ...this.options, ...{ events: events } };
      });

      this.options = {
          plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin],
          initialDate: '2023-01-18',
          locale:esLocale,
          headerToolbar: {
              left: 'prev,next today',
              center: 'title',
              right: ''
          },
          editable: true,
          selectable: true,
          selectMirror: true,
          dayMaxEvents: true
      };
  }
}
