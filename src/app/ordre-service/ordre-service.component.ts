import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { OrdreDeServiceService } from 'app/Services/ordre-de-service.service';
import { OrdresService } from 'app/Model/OrdresService';

@Component({
  selector: 'app-ordre-service',
  templateUrl: './ordre-service.component.html',
  styleUrls: ['./ordre-service.component.scss']
})
export class OrdreServiceComponent implements OnInit {

  displayedColumns: string[] = ['id_os', 'id_marche', 'date_os_debut', 'date_os_fin', 'editer', 'supprimer', 'ajouter'];
  dataSource = [];
  isLoading = true;

  constructor(private OrdreService : OrdreDeServiceService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.refresh();
  }

  // Fonction de l'actualisation
  refresh()
  {
    this.OrdreService.OrdreServiceList()
    .subscribe(
      (response : OrdresService[]) =>
      {
        this.isLoading = false;
        this.dataSource = response;
        this.changeDetectorRef.detectChanges();
      })
  }

}
