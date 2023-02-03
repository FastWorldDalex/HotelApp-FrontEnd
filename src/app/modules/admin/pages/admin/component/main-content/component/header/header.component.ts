import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() collapsedChange = new EventEmitter<{ collapsed: boolean }>();
  status: boolean = false;
  clickEvent(){
    this.status = !this.status;
    this.collapsedChange.emit({ collapsed: this.status });
  }
}
