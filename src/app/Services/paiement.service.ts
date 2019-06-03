import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paiements } from 'app/Model/Paiements';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {

  constructor(private http : HttpClient) 
  { }

  // Fonction de récupération de la liste des paiements
  paiementList() : Observable<any>
  {
    return this.http.get<Paiements[]>('http://localhost:8000/api/paiement')
    .map(
      (response => {
        return response;
      }
    ));
  }
}
