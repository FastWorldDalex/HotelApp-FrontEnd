import { Component, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent {
  @Output() collapseSidebar = new EventEmitter<boolean>();
  collapsed: boolean = true;
  collapsedHeader(value:boolean){
    this.collapsed = value;
    this.collapseSidebar.emit(value);
  }
}
