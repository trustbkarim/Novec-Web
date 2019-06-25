import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { ConstatService } from 'app/Services/constat.service';
import { Constats } from 'app/Model/Constats';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-constat',
  templateUrl: './constat.component.html',
  styleUrls: ['./constat.component.scss']
})
export class ConstatComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_constat', 'id_marche', 'id_rubrique', 'id_sous_rubrique', 'id_periode', 'valeur_constat', 'editer', 'supprimer', 'ajouter'];
  constat_data_table : Constats[] = [];
  dataSource = new MatTableDataSource<Constats>(this.constat_data_table);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  
  isLoading = true;

  constructor(private constatService : ConstatService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
