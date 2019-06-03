import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/Rx';
import { Constats } from 'app/Model/Constats';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConstatService {

  constructor(private http : HttpClient) 
  { }

  // Foncion de récupération de la liste des constats
  constatList() : Observable<any>
  {
    return this.http.get<Constats[]>('http://localhost:8000/api/constat')
    .map(
      (response => { 
        return response; 
      } 
      ));
  }

  // Fonction pour le stockage du constat
  constatStore(newConstat : Constats)
  {
    return this.http.post('http://localhost:8000/api/constat', newConstat)
    .map(
      (response => {
        return response;
      }
      ));
  }

  // Fonction pour supprimer 
  constatDelete(id : Number)
  {
    return this.http.delete('http://localhost:8000/api/constat/' + id)
    .map(
      (response => {
        return response;
      }
      ));
  }
}
