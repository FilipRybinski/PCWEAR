import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { PopupTemplateComponent } from 'src/app/components/popup-template/popup-template.component';
import { archive } from 'src/app/interfaces/archive.model';
import { archiveChangeState } from 'src/app/interfaces/archiveChangeState.model';
import { PopupService } from 'src/app/services/popup.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-manage-archives',
  templateUrl: './manage-archives.component.html',
  styleUrls: ['./manage-archives.component.scss']
})
export class ManageArchivesComponent extends PopupTemplateComponent implements OnInit{
  archives$!:Observable<archive[]>;
  arrayChanges:archiveChangeState[]=[];
  currentSelected!:number;
  constructor(
    private _popupService:PopupService,
    private _threadService:ThreadService,
    private _toastService:ToastrService){
    super();
  }
  ngOnInit(): void {
    this.waiting=false;
    this.archives$=this._threadService.getArchives();
  }
  exit(){
    this._popupService.clearPopup();
  }
  changeArchiveState(archive:archive,value:boolean){
    archive.archived=value;
    let convertedArray=this.arrayChanges.map(e=>JSON.stringify(e.threadId));
    let id=JSON.stringify(archive.id);
    if(convertedArray.includes(id)){
      let index=convertedArray.indexOf(id);
      this.arrayChanges[index]={threadId:archive.id,archive:value};
      return;
    }
    this.arrayChanges.push({threadId:archive.id,archive:value});
  }
  saveChanges(){
    if(this.arrayChanges.length==0){
      this.exit();
      return;
    }
    this._threadService.changeArchive(this.arrayChanges).subscribe(
      {
        next:(res)=>{
          this._toastService.success('','Successfully updated permissions');
        },
        error:(err)=>{
          this._toastService.error(err.error.Message,err.error.Code);
        }
      }
    )
    this.exit();
  }

}
