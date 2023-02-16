import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { AdministratorService } from 'src/app/modules/administrator/services/administrator.service';
import { SelectItem } from 'src/app/shared/interface/interfaces';
import { HomeService } from '../../../services/home.service';

@Component({
  selector: 'app-closed-date',
  templateUrl: './closed-date.component.html',
  styleUrls: ['./closed-date.component.scss']
})
export class ClosedDateComponent implements OnInit{
  isDisplay: boolean = false;
  eventHtpp: boolean = false;
  ltsRooms: SelectItem[] = [];

  constructor(
    private administratorService: AdministratorService,
    private homeService: HomeService,
    private messageService: MessageService
  ) {
  }

  ngOnInit() {
    const p1 = this.getRooms();
    Promise.all([p1]).then((res) => {

    });
  }

  componentsInitials(){
    this.isDisplay = true;
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
}
