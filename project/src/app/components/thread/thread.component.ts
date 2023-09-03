import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/services/account.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss']
})
export class ThreadComponent implements OnInit{
  threadId!:number;
  file: FormData=new FormData();
  constructor(private _route:ActivatedRoute,private _threadService:ThreadService,private _accountService:AccountService,private _toastService:ToastrService){}
  ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      this.threadId=params['id'];
    })
    this._threadService.updateViews(this.threadId).subscribe();
  }
  onFilechange(event: any) {
    console.log(event.target.files[0])
    this.file.append('File', event.target.files[0]);
  }
  upload() {
    console.log(this.file.forEach(e=>console.log(e)));
    this._accountService.setUserIcon(this.file).subscribe();

  }
}
