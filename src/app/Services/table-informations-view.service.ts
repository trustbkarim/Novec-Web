import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TableInformationsView } from 'app/Model/TableInformationsView';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class TableInformationsViewService {

  constructor(private http : HttpClient) 
  { }

  // Récupération de la liste des sous-rubriques
  tableInformationsList() : Observable<TableInformationsView[]>
  {
    return this.http.get<TableInformationsView[]>('http://localhost:8000/api/tableInformation')
    .map(
      ( response =>
        {
          return response;
        }
      )
    )
  }
}
