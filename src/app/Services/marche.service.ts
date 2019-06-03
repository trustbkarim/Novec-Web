import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Marches } from 'app/Model/Marches';

@Injectable({
  providedIn: 'root'
})
export class MarcheService {

  constructor(private http : HttpClient) 
  { }

  // Foncion de récupération de la liste des constats
  marcheList() : Observable<any>
  {
    return this.http.get<Marches[]>('http://localhost:8000/api/marche')
    .map(
      (response => {
        return response;
      }
    ));
  }
}
