import { Component, OnInit } from '@angular/core';
import { Periodes } from 'app/Model/Periodes';
import { HttpClient } from '@angular/common/http';
import Chart = require('chart.js');
import { ConstatService } from 'app/Services/constat.service';
import { Constats } from 'app/Model/Constats';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public lineChartLabels = ['P1', 'P2', 'P3', 'P4'];
  // public lineChartData = [0, 25, 90, 55];
  // public lineChartType = 'line';

  title = 'Diagramme de l\'état d\'avancement cumulé physique';
  data: Periodes[];
  periode_diagramme = [];
  suivi_avancement_cum_physique_diagramme = [];
  chart = <any>[];

  // Liste des constats
  constatsList : Constats[];

  // Constat Object
  valeurConstat : Number;

  // Liste des périodes
  periodesList : Periodes;

  // form-group
  constatFrom : FormGroup;
   
  constructor(private constatService : ConstatService, private formBuilder : FormBuilder, private http : HttpClient) 
  { }

  ngOnInit() 
  {

    // Remplir le select de la sous-rubrique
    this.constatService.constatList()
    .subscribe(
      response => 
      {
        this.constatsList = response;
      }
    )

    // Validation
    this.constatFrom = this.formBuilder.group({
      id_sous_rubrique : [null, Validators.required]
    })
  }

  // Chart Js
  afficherDiargamme()
  {
    // je récupére le id de la sous-rubrique seléctionnée
    this.valeurConstat = this.constatFrom.get('id_sous_rubrique').value;

    
    // Diagramme selon la selection de la sous-rubrique
    this.http.get<Periodes[]>('http://localhost:8000/api/periode')
    .subscribe((response: Periodes[]) => 
    {
        // this.periodesList = response;

        for(let constat of this.constatsList)
        {
          for(let periode of response)
          {
            if(constat.id_sous_rubrique == this.valeurConstat && constat.id_periode == periode.id_periode)
            {
              this.periode_diagramme.push(periode.id_periode);
              console.log(periode)
              this.suivi_avancement_cum_physique_diagramme.push(periode.suivi_avancement_cum_physique);
            }
          }
        }      
      
        this.chart = new Chart('canvas', {
          type: 'line',
          data: {
            labels: this.periode_diagramme,
            datasets: [
              {
                data: this.suivi_avancement_cum_physique_diagramme,
                borderColor: '#7FB3D5',
                fill: false
              }
            ]
          },
          options: {
            legend: {
              display: false
            },
            scales: {
              xAxes: [{
                display: true
              }],
              yAxes: [{
                display: true
              }],
            }
          }
        });
      }
    );

    this.periode_diagramme = [];
    this.suivi_avancement_cum_physique_diagramme = [];
  }

}
