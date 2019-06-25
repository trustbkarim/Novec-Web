import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PaiementService } from 'app/Services/paiement.service';
import { Paiements } from 'app/Model/Paiements';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_paiement', 'id_marche', 'montant', 'date_paiement', 'editer', 'supprimer', 'ajouter'];
  paiement_data_table : Paiements[] = [];
  dataSource = new MatTableDataSource<Paiements>(this.paiement_data_table);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;

  constructor(private paiementService : PaiementService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.refresh();
  }

  // fonction de l'actualisation
  refresh()
  {
    this.paiementService.paiementList()
    .subscribe(
      (response : Paiements[]) => 
      {
        this.isLoading = false;
        this.dataSource.data = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
