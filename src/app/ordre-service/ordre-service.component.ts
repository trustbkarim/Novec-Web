import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { OrdreDeServiceService } from 'app/Services/ordre-de-service.service';
import { OrdresService } from 'app/Model/OrdresService';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-ordre-service',
  templateUrl: './ordre-service.component.html',
  styleUrls: ['./ordre-service.component.scss']
})
export class OrdreServiceComponent implements OnInit {

  displayedColumns: string[] = ['id_os', 'id_marche', 'date_os_debut', 'date_os_fin', 'editer', 'supprimer', 'ajouter'];
  ordres_service_data_table : OrdresService[] = [];
  dataSource = new MatTableDataSource<OrdresService>(this.ordres_service_data_table);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;

  constructor(private OrdreService : OrdreDeServiceService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
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
        this.dataSource.data = response;
        this.changeDetectorRef.detectChanges();
      })
  }

}
