import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { RubriqueService } from 'app/Services/rubrique.service';
import { Rubriques } from 'app/Model/Rubriques';
import { resolve } from 'url';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.scss']
})
export class RubriqueComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id', 'id_marche', 'lib_rubrique', 'editer', 'supprimer', 'ajouter'];
  dataSource = [];
  isLoading = true;

  constructor(private rubriqueService : RubriqueService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.refresh();
  }

  // Actualiser les données 
  refresh()
  {
    this.rubriqueService.rubriqueList()
    .subscribe(
      (response : Rubriques[]) =>
      {
        this.isLoading = false;
        this.dataSource = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
