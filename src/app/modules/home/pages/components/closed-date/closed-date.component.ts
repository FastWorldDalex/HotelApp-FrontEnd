import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { SelectItem } from 'src/app/shared/interface/interfaces';
import { HomeService } from '../../../services/home.service';
import { ClosedSchedule } from '../../interfaces/ireserva';

@Component({
  selector: 'app-closed-date',
  templateUrl: './closed-date.component.html',
  styleUrls: ['./closed-date.component.scss']
})
export class ClosedDateComponent implements OnInit{
  isDisplay: boolean = false;
  eventHtpp: boolean = false;
  ltsRooms: SelectItem[] = [];
  closed_schedule: ClosedSchedule;

  constructor(
    private homeService: HomeService,
    private messageService: MessageService
  ) {
    this.closed_schedule = new ClosedSchedule(); 
  }

  ngOnInit() {
    const p1 = this.getRooms();
    Promise.all([p1]).then((res) => {

    });
  }

  componentsInitials(_closed_schedule?: any): void{
    this.isDisplay = true;
    this.closed_schedule = new ClosedSchedule();
    console.log("?", this.closed_schedule)
  }

  coreGuardar(){
    this.postClosedSchedule();
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

  async postClosedSchedule() {
    this.closed_schedule.status = 1;
    let start_date: string = `${this.closed_schedule.start_date.getFullYear()}-${this.closed_schedule.start_date.getMonth() + 1}-${this.closed_schedule.start_date.getDate()}`;
    this.closed_schedule.start_date = start_date;
    let end_date: string = `${this.closed_schedule.end_date.getFullYear()}-${this.closed_schedule.end_date.getMonth() + 1}-${this.closed_schedule.end_date.getDate()}`;
    this.closed_schedule.end_date = end_date;
    console.log("Closed Schedule", this.closed_schedule);

    const resp_closed_schedule: any = await this.homeService.PostClosedSchedule(this.closed_schedule);
    if(resp_closed_schedule != null && resp_closed_schedule.status != 400) {
      console.log("Closed Schedule Inserted", this.closed_schedule);
      this.isDisplay = false;
      this.showSuccess('success', 'success', `Se bloqueo la fecha por ${this.closed_schedule.description}.`);
    }else {
      console.log("FALLO INSERTAR Closed Schedule");
      this.showSuccess('Error', 'Error', 'No se pudo bloquear la fecha.');
    }
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
