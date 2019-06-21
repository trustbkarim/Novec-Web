import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Rx';
import { MarcheView } from 'app/Model/MarcheView';

@Injectable({
  providedIn: 'root'
})
export class MarcheViewService {

  constructor(private http : HttpClient) 
  { }

  marcheViewList() : Observable<MarcheView[]>
  {
    return this.http.get<MarcheView[]>('http://localhost:8000/api/marcheView/')
    .map(
      (
        response =>
        {
          return response;
        })
    )
  }

}
