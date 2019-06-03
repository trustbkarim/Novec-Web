import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MarcheService } from 'app/Services/marche.service';
import { Marches } from 'app/Model/Marches';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.scss']
})
export class MarcheComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_marche', 'num_marche', 'intitule', 'duree_jour', 'duree_mois', 'montant_marche', 'editer', 'supprimer', 'ajouter'];
  dataSource = [];
  isLoading = true;

  constructor(private marcheService : MarcheService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.refresh();
  }

  // fonction de l'actualisation
  refresh()
  {
    this.marcheService.marcheList()
    .subscribe(
      (response : Marches[]) => 
      {
        this.isLoading = false;
        this.dataSource = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
