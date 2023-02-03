import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() collapsedChange = new EventEmitter<boolean>();
  status: boolean = false;
  toggleSidebar(){
    this.status = !this.status;
    this.collapsedChange.emit(this.status);
  }
}
