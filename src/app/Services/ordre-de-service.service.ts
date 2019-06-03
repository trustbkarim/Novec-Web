import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { OrdresService } from 'app/Model/OrdresService';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class OrdreDeServiceService {

  constructor(private http : HttpClient) 
  { }

  // Fonction de récupération de la liste des ordres de service
  OrdreServiceList() : Observable<any>
  {
    return this.http.get<OrdresService[]>('http://localhost:8000/api/OrdresService')
    .map(
      (response => {
        return response;
      }
    ));
  }
}
