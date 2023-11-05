import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Chart } from 'chart.js';
import { AccountService } from 'src/app/services/account.service';
import { CookieService } from 'src/app/services/cookie.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit{
  threadStatistics!:any;
  userId!:number;
  constructor(
    private _accountService:AccountService,
    private _route:ActivatedRoute,
    private _route2:Router,
    private _cookieSerivce:CookieService){

  }
  ngOnInit(): void {
    this._route.queryParams.subscribe(params=>{
      this.userId=params['id'];
        this._accountService.getThreadStatistics(this.userId).subscribe(
          {
            next:(res)=>{
              this.threadStatistics=new Chart('canvas',{
                type: 'bar',
                data: {
                  labels: res.map(e=>e.name),
                  datasets: [{
                    label: 'Likes',
                    data: res.map(e=>e.likes),
                    backgroundColor: ['rgba(75, 192, 192, 0.2)'],
                    borderColor: ['rgb(75, 192, 192)'],
                    borderWidth: 2,
                    borderRadius:25,
                  },
                  {
                    label: 'Dislikes',
                    data: res.map(e=>e.dislikes),
                    backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                    borderColor: ['rgb(255, 99, 132)'],
                    borderWidth: 2,
                    borderRadius:25,
                  },
                  {
                    label: 'Views',
                    data: res.map(e=>e.views),
                    backgroundColor: ['rgba(54, 162, 235, 0.2)'],
                    borderColor: ['rgb(54, 162, 235)'],
                    borderWidth: 2,
                    borderRadius:25,
                  },
                ]
                }
              });
            },
            error:(err)=>{
              this._route2.navigate(['/home'])
            }
          })
      }
  )
  }
}
