import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { thread } from 'src/app/interfaces/thread.model';
import { PostService } from 'src/app/services/post.service';
import { ThreadService } from 'src/app/services/thread.service';

@Component({
  selector: 'app-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.scss'],
})
export class ThreadComponent implements OnInit{
  threadId!:number;
  thread$!:Observable<thread>;
  constructor(
    private _route:ActivatedRoute,
    private _threadService:ThreadService,
    private _toastService:ToastrService,
    private _postService:PostService){}
  ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      this.threadId=params['id'];
      this._threadService.setThreadId=params['id'];
      if(!params['temporary']) this._threadService.updateViews(this.threadId).subscribe({error:(err)=>{}});
      this.thread$=this._threadService.thread$;
    })
  }
  addAnswear(){
    this._postService.addPost(this.threadId).subscribe((res)=>{
      console.log(res);
    },(err)=>{
      console.log(err);
    })
  }
}
