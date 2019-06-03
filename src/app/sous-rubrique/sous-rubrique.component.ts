import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { SousRubriqueService } from 'app/Services/sous-rubrique.service';
import { SousRubriques } from 'app/Model/SousRubriques';

@Component({
  selector: 'app-sous-rubrique',
  templateUrl: './sous-rubrique.component.html',
  styleUrls: ['./sous-rubrique.component.scss']
})
export class SousRubriqueComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_sous_rubrique', 'id_marche', 'id_rubrique', 'lib_sous_rubrique', 'unite', 'valeur_cible', 'editer', 'supprimer', 'ajouter'];
  dataSource = [];
  isLoading = true;

  constructor(private sousRubriqueService : SousRubriqueService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.refresh();
  }

  // Fonction de l'actualisation
  refresh()
  {
    this.sousRubriqueService.sousRubriqueList()
    .subscribe(
      (response : SousRubriques[]) => 
      {
        console.log(response)
        this.isLoading = false;
        this.dataSource = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
