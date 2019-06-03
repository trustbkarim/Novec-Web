import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Rubriques } from 'app/Model/Rubriques';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class RubriqueService {

  constructor(private http : HttpClient) 
  { }

  // Récupération de la liste des rubriques
  rubriqueList() : Observable<any>
  {
    return this.http.get<Rubriques[]>('http://localhost:8000/api/rubrique')
    .map(
      (response => {
        return response;
      })
    )
  }
}
