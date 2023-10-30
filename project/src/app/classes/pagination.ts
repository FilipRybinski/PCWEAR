import { HttpParams } from "@angular/common/http";

export class Pagination{
    private pageName:string;
    private pageSizeName:string;
    private page:number;
    private pageSize:number;
    private queryParamsFitler:HttpParams
  constructor(){
    this.pageName='page';
    this.pageSizeName='pageSize';
    this.page=1;
    this.pageSize=5
    this.queryParamsFitler=new HttpParams().append(this.pageName,this.page).append(this.pageSizeName,this.pageSize);
  }
  public set setPage(value:number){
    this.page=value;
    this.queryParamsFitler=this.queryParamsFitler.set(this.pageName,this.page);
  }
  public set setPageSize(value:number){
    this.pageSize=value;
    this.queryParamsFitler=this.queryParamsFitler.set(this.pageSizeName,this.pageSize);
  }
  public get getPage(){
    return this.page;
  }
  public get getPageSize(){
    return this.pageSize;
  }
  public get getQueryParams(){
    return this.queryParamsFitler;
  }
  public setQueryParams(resetFlag:boolean,filter?:object){
    this.page=1;
    this.queryParamsFitler=new HttpParams()
    .append(this.pageName,this.page)
    .append(this.pageSizeName,this.pageSize)
    if(!resetFlag && filter){
      Object.entries(filter).map(e=>{
        if(e[1]){
          this.queryParamsFitler.has(e[0]) ? 
          this.queryParamsFitler=this.queryParamsFitler.set(e[0],e[1]) :
          this.queryParamsFitler=this.queryParamsFitler.append(e[0],e[1]);
        }
      })
    }
  }

}