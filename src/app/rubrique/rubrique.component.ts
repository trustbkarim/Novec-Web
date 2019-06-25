import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { RubriqueService } from 'app/Services/rubrique.service';
import { Rubriques } from 'app/Model/Rubriques';
import { resolve } from 'url';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-rubrique',
  templateUrl: './rubrique.component.html',
  styleUrls: ['./rubrique.component.scss']
})
export class RubriqueComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id', 'id_marche', 'lib_rubrique', 'editer', 'supprimer', 'ajouter'];
  rubrique_data_table : Rubriques[] = [];
  dataSource = new MatTableDataSource<Rubriques>(this.rubrique_data_table);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;

  constructor(private rubriqueService : RubriqueService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
