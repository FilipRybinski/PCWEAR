import { Injectable, OnInit } from '@angular/core';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr';
import { UserMessage } from '../interfaces/message.model';
import { ToastrService } from 'ngx-toastr';
import { toastConfig } from '../constants/toastConfig';
import { AccountService } from './account.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HubService implements OnInit {
  private hubConnectionBuilder!: HubConnection;
  message:Subject<UserMessage>=new Subject<UserMessage>();
  isSuccessfulyConnected!: boolean;
  constructor(private _toastSerivce: ToastrService, private _accountService: AccountService,private _http:HttpClient,private _accountSerive:AccountService) { }
  ngOnInit(): void {
  }
  public async connect() {
    this.hubConnectionBuilder = new HubConnectionBuilder()
      .withUrl('https://localhost:5000/hub/message')
      .configureLogging(LogLevel.Information)
      .build();
    this.hubConnectionBuilder
      .start()
      .then(() => {
        this.isSuccessfulyConnected = true;
        if(this._accountSerive.currentLoggedUser==undefined) this._toastSerivce.error('', 'Login to write on chat', toastConfig);
        this._toastSerivce.success('Say hello to others', 'Connection successfuly', toastConfig)
      }).catch(err => {
        this.isSuccessfulyConnected = false;
        this._toastSerivce.error('', 'Error while connect with server', toastConfig)
      }
      );
    this.hubConnectionBuilder.on('SendOffersToUser', (result: UserMessage) => {
      this.message.next(result);
    });
  }
  public disconnect() {
    this.hubConnectionBuilder.stop().then((res) => {
      this.isSuccessfulyConnected = false;
      this._toastSerivce.success('', 'Disconnected successfully', toastConfig)
    }).catch((err) => {
      this._toastSerivce.error('', 'Error while disconnecting with server', toastConfig);
    })
  }
  sendMessage(object:UserMessage){
    return this._http.post<UserMessage>("https://localhost:5000/hub/message", object);
  }
}
