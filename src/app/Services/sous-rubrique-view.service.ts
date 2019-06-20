import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/Rx';
import { SousRubriqueView } from 'app/Model/SousRubriqueView';

@Injectable({
  providedIn: 'root'
})
export class SousRubriqueViewService {

  constructor(private http : HttpClient) 
  { }

  // Récupération de la liste des données pour la VUE sous-rubrique-view
  sousRubriqueViewList() : Observable<SousRubriqueView[]>
  {
    return this.http.get<SousRubriqueView[]>('http://localhost:8000/api/sousRubriqueView/')
    .map(
      (
        response =>
        {
          return response
        }
      )
    )
  }
}
