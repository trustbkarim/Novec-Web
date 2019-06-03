import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SousRubriques } from 'app/Model/SousRubriques';
import 'rxjs/Rx';


@Injectable({
  providedIn: 'root'
})
export class SousRubriqueService {

  constructor(private http : HttpClient) 
  { }

  // Récupération de la liste des sous-rubriques
  sousRubriqueList() : Observable<any>
  {
    return this.http.get<SousRubriques[]>('http://localhost:8000/api/sousRubrique')
    .map(
      (response => {
        return response;
      }
    ))
  }
}
