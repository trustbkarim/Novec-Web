import { Component, OnInit } from '@angular/core';
import { Periodes } from 'app/Model/Periodes';
import { HttpClient } from '@angular/common/http';
import Chart = require('chart.js');
import { ConstatService } from 'app/Services/constat.service';
import { Constats } from 'app/Model/Constats';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MarcheService } from 'app/Services/marche.service';
import { Marches } from 'app/Model/Marches';
import { SousRubriqueService } from 'app/Services/sous-rubrique.service';
import { SousRubriques } from 'app/Model/SousRubriques';
import { PeriodeService } from 'app/Services/periode.service';
import { RubriqueService } from 'app/Services/rubrique.service';
import { Rubriques } from 'app/Model/Rubriques';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // public lineChartLabels = ['P1', 'P2', 'P3', 'P4'];
  // public lineChartData = [0, 25, 90, 55];
  // public lineChartType = 'line';

  data: Periodes[];

  // Les valeurs du diargramme de projet
  periode_diagramme_projet = [];
  suivi_avancement_cum_physique_diagramme_projet = [];

  // Les valeurs du diagramme du sous-rubrique
  periode_diagramme_sous_rubrique = [];
  suivi_avancement_cum_physique_diagramme_sous_rubrique = [];

  chart = <any>[];

  // Liste des constats
  constatsList : Constats[];

  // Liste des marchés
  marchesList : Marches[];

  // Liste des périodes
  periodesList : Periodes[];

  // Liste des sous-rubriques
  sousRubriquesList : SousRubriques[];

  // Liste des rubriques
  rubriquesList : Rubriques[];

  // Liste des périodes
  periodesListPourSousRubrique : Periodes[];

  // Valeur du constat récupéré du SELECT
  valeurConstat : Number;

  // Valeur du marché récupéré du SELECT
  valeurMarche : Number;

  // Valeur de la sous-rubrique récupéré du SELECT
  valeurSousRubrique : Number;

  // form-group
  constatFrom : FormGroup;

  // Marché form 
  marcheForm : FormGroup;

  // Sous-rubrique form
  sousRubriqueForm : FormGroup;
   
  constructor(private rubriqueService : RubriqueService, private constatService : ConstatService, private periodService : PeriodeService, private sousRubriqueService : SousRubriqueService, private marcheService : MarcheService, private formBuilder : FormBuilder, private http : HttpClient) 
  { }

  ngOnInit() 
  {

    // Remplir le select de la sous-rubrique
    // this.constatService.constatList()
    // .subscribe(
    //   response => 
    //   {
    //     this.constatsList = response;
    //   }
    // )

    // Remplir le select de la sous-rubrique
    this.sousRubriqueService.sousRubriqueList()
    .subscribe(
      response =>
      {
        this.sousRubriquesList = response;
      }
    )

    // Remplir le select du marché 
    this.marcheService.marcheList()
    .subscribe(
      response => 
      {
        this.marchesList = response;
      }
    );

    // Récupéré les période 
    this.periodService.periodeList()
    .subscribe(
      response => 
      {
        this.periodesListPourSousRubrique = response;
      }
    )

    // Récupéré le select des rubriques
    this.rubriqueService.rubriqueList()
    .subscribe(
      response =>
      {
        this.rubriquesList = response
      }
    )
    

    // Validation
    // this.constatFrom = this.formBuilder.group({
    //   id_sous_rubrique : [null, Validators.required]
    // })

    // Validations du marché
    this.marcheForm = this.formBuilder.group({
      num_marche : [null, Validators.required]
    });

    // Validations de la sous-rubrique
    this.sousRubriqueForm = this.formBuilder.group({
      id_sous_rubrique : [null, Validators.required]
    })
    
  }

  // Diagramme selon la selection du projet
  diagrammeProjet()
  {
    // Valeur du marché récupéré
    this.valeurMarche = this.marcheForm.get('num_marche').value;

    this.http.get<Periodes[]>('http://localhost:8000/api/periode')
    .subscribe((response: Periodes[]) => 
    {    
      for(let periode of response)
      {
        if(periode.id_projet == this.valeurMarche)
        {
            this.periode_diagramme_projet.push(periode.num_periode);
            this.suivi_avancement_cum_physique_diagramme_projet.push(periode.suivi_avancement_cum_physique);
        }
      }
      
       this.chart = new Chart('canvas', {
         type: 'line',
         data: {
           labels: this.periode_diagramme_projet,
           datasets: [
             {
               data: this.suivi_avancement_cum_physique_diagramme_projet,
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
     });      

    this.periode_diagramme_projet = [];
    this.suivi_avancement_cum_physique_diagramme_projet = [];
  }


  // Fonction pour afficher le diagramme de la sous-rubrique
  diagrammeSousRubrique()
  {
    this.http.get<Periodes[]>('http://localhost:8000/api/periode')
    .subscribe(
      result =>
      {
        this.periodesListPourSousRubrique = result;
      }
    )
    // Valeur du marché récupéré
    this.valeurSousRubrique = this.sousRubriqueForm.get('id_sous_rubrique').value;

    // Diagramme selon la selection de la sous-rubrique
    this.http.get<Constats[]>('http://localhost:8000/api/constat')
    .subscribe((results: Constats[]) => 
    { 
      for(let constat of results)
      {
        for(let sousRubrique of this.sousRubriquesList)
        {          
            // if(sousRubrique.id_sous_rubrique == constat.id_sous_rubrique)
            // {
            //   this.suivi_avancement_cum_physique_diagramme_sous_rubrique.push((constat.valeur_constat / sousRubrique.valeur_cible));
            // }

            // if(this.valeurSousRubrique == constat.id_sous_rubrique && this.valeurSousRubrique == sousRubrique.id_sous_rubrique)
            // {
            //   this.suivi_avancement_cum_physique_diagramme_sous_rubrique.push((constat.valeur_constat / sousRubrique.valeur_cible));
            // }

            if(this.valeurSousRubrique == constat.id_sous_rubrique)
            {
              this.suivi_avancement_cum_physique_diagramme_sous_rubrique.push((constat.valeur_constat / sousRubrique.valeur_cible));
            }
        }
      }

      for(let p of this.periodesListPourSousRubrique)
      {
        this.periode_diagramme_sous_rubrique.push(p.id_periode);
      }
      
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.periode_diagramme_sous_rubrique,
          datasets: [
            {
              data: this.suivi_avancement_cum_physique_diagramme_sous_rubrique,
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

    this.periode_diagramme_sous_rubrique = [];
    this.suivi_avancement_cum_physique_diagramme_sous_rubrique = [];
  }

}
