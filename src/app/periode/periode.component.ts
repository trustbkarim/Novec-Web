import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PeriodeService } from 'app/Services/periode.service';
import { Periodes } from 'app/Model/Periodes';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-periode',
  templateUrl: './periode.component.html',
  styleUrls: ['./periode.component.scss']
})
export class PeriodeComponent implements OnInit {

  // Material data table columns & dataSource
  displayedColumns: string[] = ['id_periode', 'id_projet', 'lib_projet', 'num_periode', 'suivi_avancement_unitaire_physique', 'suivi_avancement_unitaire_financier', 'suivi_avancement_cum_financier', 'suivi_avancement_cum_physique', 'editer', 'supprimer', 'ajouter'];
  periode_data_table : Periodes[] = [];
  dataSource = new MatTableDataSource<Periodes>(this.periode_data_table);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  isLoading = true;

  constructor(private periodeService : PeriodeService, private changeDetectorRef : ChangeDetectorRef) 
  { }

  ngOnInit() 
  {
    this.dataSource.paginator = this.paginator;
    this.refresh();
  }

  // fonction de l'actualisation
  refresh()
  {
    this.periodeService.periodeList()
    .subscribe(
      (response : Periodes[]) => 
      {
        this.isLoading = false;
        this.dataSource.data = response;
        this.changeDetectorRef.detectChanges();
      }
    )
  }

}
