import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ConstatService } from 'app/Services/constat.service';
import { Constats } from 'app/Model/Constats';

@Component({
  selector: 'app-constat',
  templateUrl: './constat.component.html',
  styleUrls: ['./constat.component.scss']
})
export class ConstatComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_constat', 'id_marche', 'id_rubrique', 'id_sous_rubrique', 'id_periode', 'valeur_constat', 'editer', 'supprimer', 'ajouter'];
  dataSource = [];
  isLoading = true;

  constructor(private constatService : ConstatService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    // Récupération des données
    this.refresh();
  }

  // fonction de l'actualisation
  refresh()
  {
    this.constatService.constatList()
    .subscribe(
      (response : Constats[]) => 
      {
        this.isLoading = false;
        this.dataSource = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
