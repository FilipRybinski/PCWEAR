import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/interfaces/comment.model';
import { CommentsService } from 'src/app/services/comments.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit{
  partId!:number;
  comments$!:Observable<Comment[]>;
  constructor(
    private _commentsService:CommentsService,
    private _route:ActivatedRoute
    ){}
  ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      this.partId=params['id'];
      this.comments$=this._commentsService.getAssessments(this.partId);
    })
  }
}
