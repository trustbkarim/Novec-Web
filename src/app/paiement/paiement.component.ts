import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { PaiementService } from 'app/Services/paiement.service';
import { Paiements } from 'app/Model/Paiements';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.scss']
})
export class PaiementComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_paiement', 'id_marche', 'montant', 'date_paiement', 'editer', 'supprimer', 'ajouter'];
  dataSource = [];
  isLoading = true;

  constructor(private paiementService : PaiementService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
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
        this.dataSource = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
