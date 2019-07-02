import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/Rx';
import { DistinctPeriodes } from 'app/Model/distinctPeriodes';
import { Observable } from 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class DistinctPeriodesService {

  constructor(private http : HttpClient) 
  { }

  distinctPeriodeViewList() : Observable<DistinctPeriodes[]>
  {
    return this.http.get<DistinctPeriodes[]>('http://localhost:8000/api/distinctPeriodes')
    .map(
      (
        response =>
        {
          return response;
        })
    )
  }
}
