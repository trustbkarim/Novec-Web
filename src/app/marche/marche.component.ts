import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MarcheService } from 'app/Services/marche.service';
import { Marches } from 'app/Model/Marches';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-marche',
  templateUrl: './marche.component.html',
  styleUrls: ['./marche.component.scss']
})
export class MarcheComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_marche', 'num_marche', 'intitule', 'duree_jour', 'duree_mois', 'montant_marche', 'editer', 'supprimer', 'ajouter'];
  marche_data_table : Marches[] = [];
  dataSource = new MatTableDataSource<Marches>(this.marche_data_table);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;

  constructor(private marcheService : MarcheService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
