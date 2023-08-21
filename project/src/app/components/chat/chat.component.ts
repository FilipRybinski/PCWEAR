import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserMessage } from 'src/app/interfaces/message.model';
import { User } from 'src/app/interfaces/user.models';
import { AccountService } from 'src/app/services/account.service';
import { HubService } from 'src/app/services/hub.service';
import { bounceInLeftOnEnterAnimation,bounceOutLeftOnLeaveAnimation } from 'angular-animations';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  animations:[bounceInLeftOnEnterAnimation(),bounceOutLeftOnLeaveAnimation()]
})
export class ChatComponent implements OnInit,OnDestroy{
  isVisible: boolean = false;
  sendForm!:FormGroup;
  messages:UserMessage[]=[];
  unreadMessages:number=0
  foucsed:boolean=false;
  currentLoggedUser!:User;
  @ViewChild('message') message!:ElementRef;
  constructor(private _hubService: HubService, private _formBuilder:FormBuilder,private _accountService:AccountService) {
  } 
  ngOnInit(): void {
    this._accountService.currentLoggedUser$.subscribe((res)=>{
      this.currentLoggedUser=res;
      if(this.currentLoggedUser==null || this.currentLoggedUser==undefined){
        this.sendForm.disable();
      }else{
        this.sendForm.enable();
      }
    })
    this.CreateForm();
  }
  get sendFormValue(){
    return this.sendForm.controls['message'];
  }
  openChat() {
    if (!this._hubService.isSuccessfulyConnected) {
      this._hubService.connect(this.currentLoggedUser);
      this._hubService.message.subscribe((res)=>{
          if(!this.foucsed){
            this.unreadMessages++;
          }
        this.messages.push(res);
        if(this.isVisible){
          setTimeout(()=>{
          this.message.nativeElement.scrollTop=this.message.nativeElement.scrollHeight;
        },0)
        }
        
      })
    }
    this.isVisible = true;
  }
  closeChat() {
    this._hubService.disconnect();
    this._hubService.message.complete();
    this.isVisible = false;
  }
  minimalizeChat() {
    this.isVisible = false;
  }
  sendMessage(){
    if(!this.sendForm.valid || this.currentLoggedUser==null){
      return;
    }
    const body:UserMessage={
      userEmail:this.currentLoggedUser.email,
      message:this.sendFormValue.value
    }
    this.sendForm.reset();
    this._hubService.sendMessage(body).subscribe((res)=>{
    },(err)=>{});
  }
  CreateForm(){
    this.sendForm=this._formBuilder.group({
      message:['',Validators.required]
    })
  }
  resetUnread(){
    this.foucsed=true;
    this.unreadMessages=0;
  }
  getStatus(){
    return this._hubService.isSuccessfulyConnected;
  }
  ngOnDestroy(): void {
    this._accountService.currentLoggedUser$.unsubscribe();
  }
}
