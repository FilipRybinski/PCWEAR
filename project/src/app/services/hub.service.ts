import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { UserMessage } from '../interfaces/message.model';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../constans/toastConfig';
import { Subject } from 'rxjs';
const url = 'http://localhost:5001/hub/';
@Injectable({
  providedIn: 'root'
})
export class HubService implements OnInit{
  private hubConnectionBuilder!: HubConnection;
  message: UserMessage[] = [];
  constructor(private _toastSerivce:ToastrService) { }
  ngOnInit(): void {
  }
  public connect(){
    this.hubConnectionBuilder = new HubConnectionBuilder()
    .withUrl('https://localhost:5000/hub/message')
    .configureLogging(LogLevel.Information)
    .build();
  this.hubConnectionBuilder
    .start()
    .then(() => 
      this._toastSerivce.success('Say hello to others','Connection successfuly',toastConfig))
    .catch(err => 
      this._toastSerivce.error('','Error while connect with server',toastConfig));
  this.hubConnectionBuilder.on('SendOffersToUser', (result: UserMessage) => {
    this.message.push(result);
  });
  }
  public disconnect(){
    this.hubConnectionBuilder.stop().then((res)=>{
      console.log(res);
      this._toastSerivce.success('','Disconnected successfully',toastConfig)
    }).catch((err)=>{
      this._toastSerivce.error('','Error while disconnecting with server',toastConfig);
    })
  }
}
