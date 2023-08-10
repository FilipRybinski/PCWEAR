import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserMessage } from 'src/app/interfaces/message.model';
import { HubService } from 'src/app/services/hub.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit{
  isVisible: boolean = false;
  sendForm!:FormGroup;
  messages:UserMessage[]=[];
  unreadMessages:number=0
  foucsed:boolean=false;
  @ViewChild('message') message!:ElementRef;
  constructor(public _hubService: HubService, private _formBuilder:FormBuilder) {
  }
  ngOnInit(): void {
    this.CreateForm();
  }
  get sendFormValue(){
    return this.sendForm.controls['message'];
  }
  openChat() {
    if (!this._hubService.isSuccessfulyConnected) {
      this._hubService.connect();
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
    if(!this.sendForm.valid){
      return;
    }
    const body:UserMessage={
      userEmail:this._hubService.currentLoggedUser.email,
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
}
