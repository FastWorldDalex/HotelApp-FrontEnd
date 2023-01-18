import { Component } from '@angular/core';
import { PrimeNGConfig } from 'primeng/api';
import {TreeNode} from 'primeng/api';
import { NodeService } from 'src/app/shared/services/node.service';
@Component({
  selector: 'app-administrator-sidebar, [administrator-sidebar]',
  templateUrl: './administrator-sidebar.component.html',
  styleUrls: ['./administrator-sidebar.component.scss']
})
export class AdministratorSidebarComponent{
  files1: TreeNode[] = [];
  visibleSidebar: any;
  selectedFile: any;
  
  constructor(
    private primengConfig: PrimeNGConfig,
    private nodeService: NodeService
    ) {}

    ngOnInit() {
      this.nodeService.getFiles().then(files => this.files1 = files);
      this.primengConfig.ripple = true;
    }
    nodeSelect(event:any) {
      event.node.style.backgroundColor = 'red';       
    }
  
  nodeUnselect(event:any) {
  }
}
