import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { SousRubriqueService } from 'app/Services/sous-rubrique.service';
import { SousRubriques } from 'app/Model/SousRubriques';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-sous-rubrique',
  templateUrl: './sous-rubrique.component.html',
  styleUrls: ['./sous-rubrique.component.scss']
})
export class SousRubriqueComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_sous_rubrique', 'id_marche', 'id_rubrique', 'lib_sous_rubrique', 'unite', 'valeur_cible', 'editer', 'supprimer', 'ajouter'];
  sous_rubrique_data_table : SousRubriques[] = [];
  dataSource = new MatTableDataSource<SousRubriques>(this.sous_rubrique_data_table);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;

  constructor(private sousRubriqueService : SousRubriqueService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.refresh();
  }

  // Fonction de l'actualisation
  refresh()
  {
    this.sousRubriqueService.sousRubriqueList()
    .subscribe(
      (response : SousRubriques[]) => 
      {
        this.isLoading = false;
        this.dataSource.data = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
