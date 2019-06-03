import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Periodes } from 'app/Model/Periodes';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PeriodeService {

  constructor(private http : HttpClient) 
  { }

  // Focntion de récupération de la liste des périodes
  periodeList()
  {
    return this.http.get<Periodes[]>('http://localhost:8000/api/periode')
    .map(
      (response => {
        return response;
      }
    ));
  }
}
