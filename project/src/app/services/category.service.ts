import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { category } from '../interfaces/category.model';
import { categoryAdd } from '../interfaces/categoryAdd.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private _http:HttpClient)  { }
  addCategory(body:categoryAdd){
    return this._http.post('https://localhost:5000/api/category/postCategory',body);
  }
  getCategories():Observable<category[]>{
    return this._http.get<category[]>('https://localhost:5000/api/category/getCategory');
  }
}
