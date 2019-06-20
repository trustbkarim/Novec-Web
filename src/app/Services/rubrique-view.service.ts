import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { RubriqueView } from 'app/Model/RubriqueView';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RubriqueViewService {

  constructor(private http : HttpClient) 
  { }

  rubriqueViewList() : Observable<RubriqueView[]>
  {
    return this.http.get<RubriqueView[]>('http://localhost:8000/api/rubriqueView')
    .map(
      (
        response => 
        {
          return response;
        }
      )
    )
  }
}
