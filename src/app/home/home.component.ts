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
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // public lineChartLabels = ['P1', 'P2', 'P3', 'P4'];
  // public lineChartData = [0, 25, 90, 55];
  // public lineChartType = 'line';

  data : Periodes[];

  // Les valeurs du diargramme de projet
  periode_diagramme_projet = [];
  suivi_avancement_cum_physique_diagramme_projet = [];

  // Les valeurs du diagramme du sous-rubrique
  periode_diagramme = [];
  periode_diagramme_rubrique = [];

  // La valeur à afficher pour le diagramme de sous-rubrique
  suivi_avancement_constat_sur_valeur_cible = [];

  // Valeur à afficher pour le diagramme de rubrique
  valeur_du_diagramme_rubrique = [];

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

  // Pour stocker l'objet sous-rubrique, afin d'avoir la période pour afficher le diagramme
  sousRubriqueObjet : SousRubriques;

  // Liste des périodes
  // periodesList : Periodes[];

  // Liste des id de périodes
  // periodeID : Number[] = [];

  // Valeur du constat récupéré du SELECT
  valeurConstat : Number;

  // Valeur du marché récupéré du SELECT
  valeurMarche : Number;

  // Valeur de la sous-rubrique récupéré du SELECT
  valeurSousRubrique : Number;

  // Valeur de la rubrique récupéré du SELECT
  valeurRubrique : Number;

  // Valeur du diagramme de la rubrique 
  valeur_multiplie_par_ponderation = [];

  // Liste des sous-rubriques pour le compte d'une rubrique spécifique
  sous_rubriques_depend_une_rubrique : SousRubriques[] = [];

  // Liste des rubriques dépond un marché quelconque
  rubrique_depond_un_marche : Rubriques[] = [];

  // form-group
  constatFrom : FormGroup;

  // Marché form 
  marcheForm : FormGroup;

  // Sous-rubrique form
  sousRubriqueForm : FormGroup;

  // Rubrique fomr
  rubriqueForm : FormGroup;
   
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
    // this.sousRubriqueService.sousRubriqueList()
    // .subscribe(
    //   response =>
    //   {
    //     this.sousRubriquesList = response;
    //     // this.valeur_periode_diagramme_sous_rubrique = response;
    //   }
    // )

    // Remplir le select du marché 
    this.marcheService.marcheList()
    .subscribe(
      response => 
      {
        this.marchesList = response;
      }
    );

    // Récupéré les période 
    // this.periodService.periodeList()
    // .subscribe(
    //   response => 
    //   {
    //     this.periodesListPourSousRubrique = response;
    //   }
    // )

    // Récupéré le select des rubriques
    // this.rubriqueService.rubriqueList()
    // .subscribe(
    //   response =>
    //   {
    //     this.rubriquesList = response
    //   }
    // )
    

    // Validation
    // this.constatFrom = this.formBuilder.group({
    //   id_sous_rubrique : [null, Validators.required]
    // })

    // Validations du marché
    this.marcheForm = this.formBuilder.group({
      id_marche : [null, Validators.required]
    });

    // Validations de la sous-rubrique
    this.sousRubriqueForm = this.formBuilder.group({
      id_sous_rubrique : [null, Validators.required]
    });

    // Validations de la rubrique
    this.rubriqueForm = this.formBuilder.group({
      id : [null, Validators.required]
    });
    
  }

  diagrammeMarche()
  {

    // Valeur du marché récupéré
    this.valeurMarche = this.marcheForm.get('id_marche').value;


    this.http.get<Rubriques[]>('http://localhost:8000/api/rubrique')
    .subscribe(
      result =>
      {
        // Remplir le SELECT du sous-rurique
        for(let rubrique of result)
        {
          for(let marche of this.marchesList)
          {
            if(this.valeurMarche == marche.id_marche && this.valeurMarche == rubrique.id_marche)
            {
              this.rubrique_depond_un_marche.push(rubrique);
              // console.log('rubrique_depond_un_marche',this.rubrique_depond_un_marche)
              this.rubriquesList = this.rubrique_depond_un_marche;
              // console.log('rubriquesList',this.rubriquesList)
            }
          }
        }
      }
    );

    this.rubrique_depond_un_marche = [];
  }

  // Fonction pour afficher le diagramme de la sous-rubrique
  diagrammeSousRubrique()
  {
    // Valeur de la sous-rubrique récupéré
    this.valeurSousRubrique = this.sousRubriqueForm.get('id_sous_rubrique').value;

    // Diagramme selon la selection de la sous-rubrique
    this.http.get<Constats[]>('http://localhost:8000/api/constat')
    .subscribe((results: Constats[]) => 
    {
      for(let constat of results)
      {
        for(let sousRubrique of this.sousRubriquesList)
        {
          for(let periode of this.periodesList)
          {
            if(this.valeurSousRubrique == sousRubrique.id_sous_rubrique && this.valeurSousRubrique == constat.id_sous_rubrique && periode.id_periode == constat.id_periode)
            {
              this.suivi_avancement_constat_sur_valeur_cible.push((constat.valeur_constat / sousRubrique.valeur_cible));
              this.periode_diagramme.push(constat.id_periode);
              this.periode_diagramme.sort((a, b) => a - b);
            }
          }
        }
      }
      
      this.chart = new Chart('canvas', {
        type: 'line',
        data: 
        {
          labels: this.periode_diagramme,
          datasets: [
            {
              data: this.suivi_avancement_constat_sur_valeur_cible,
              borderColor: '#7FB3D5',
              fill: true
            }
          ]
        },
        options: 
        {
          legend: 
          {
            display: false
          },
          scales: 
          {
            xAxes: 
            [{
              display: true
            }],
            yAxes: 
            [{
              display: true
            }],
          }
        }
      });
    }
  );

    this.periode_diagramme = [];
    this.suivi_avancement_constat_sur_valeur_cible = [];
  }

  // Fonction pour afficher le diagramme de la Rubrique
  diagrammeRubrique()
  {
    // récupéré la liste des périodes afin de les affichers sur le Diagramme attendu
    this.http.get<Periodes[]>('http://localhost:8000/api/periode')
    .subscribe(
      result =>
      {
        this.periodesList = result;
      }
    )

    // Remplire une liste de constat
    this.http.get<Constats[]>('http://localhost:8000/api/constat')
    .subscribe((results: Constats[]) => 
    {
      this.constatsList = results;
    });


    // Valeur de la rubrique récupéré
    this.valeurRubrique = this.rubriqueForm.get('id').value;

    // Remplir le SELECT de la sous-rubrique qui dépende d'une rubrique
    this.http.get<SousRubriques[]>('http://localhost:8000/api/sousRubrique')
    .subscribe(
      result => 
      {

        /* -------------------ça marche -------------------------- */
        // for(let sous_rubrique of result)
        // {
        //   for(let rubrique of this.rubriquesList)
        //   {
        //     if(this.valeurRubrique == rubrique.id && this.valeurRubrique == sous_rubrique.id_rubrique)
        //     {
        //       // Remplir le SELECT du sous-rurique
        //       this.sous_rubriques_depend_une_rubrique.push(sous_rubrique);
        //       this.sousRubriquesList = this.sous_rubriques_depend_une_rubrique;
        //     }
        //   }
        // }


        // for(let constat of this.constatsList)
        // {
        //   // Affichage du diagramme de la rubrique
        //   this.valeur_multiplie_par_ponderation = this.sousRubriquesList.map(i => i.valeur_cible * i.poids);
        //   this.periode_diagramme.push(constat.id_periode);
        //   this.periode_diagramme.sort((a, b) => a - b) 
        // }

        /* -------------------ça marche -------------------------- */

        // Remplir le SELECT du sous-rurique
        for(let sous_rubrique of result)
        {
          for(let rubrique of this.rubriquesList)
          {
            if(this.valeurRubrique == rubrique.id && this.valeurRubrique == sous_rubrique.id_rubrique)
            {
              this.sous_rubriques_depend_une_rubrique.push(sous_rubrique);
              this.sousRubriquesList = this.sous_rubriques_depend_une_rubrique;
            }
          }
        }


        // Affichage du diagramme de la rubrique
        for(let constat of this.constatsList)
        {         
          this.valeur_multiplie_par_ponderation = this.sousRubriquesList.map(i => i.valeur_cible * i.poids);

          this.periode_diagramme.push(constat.id_periode);
          this.periode_diagramme.sort((a, b) => a - b) 
        }

        // Supprimer les valeurs dupliquées des périodes  
        this.periode_diagramme = this.periode_diagramme.filter((el, i, a) => i === a.indexOf(el));


        this.chart = new Chart('canvas', {
          type: 'line',
          data: 
          {
            labels: this.periode_diagramme,
            datasets: [
              {
                data: this.valeur_multiplie_par_ponderation,
                borderColor: '#7FB3D5',
                fill: true
              }
            ]
          },
          options: 
          {
            legend: 
            {
              display: false
            },
            scales: 
            {
              xAxes: 
              [{
                display: true
              }],
              yAxes: 
              [{
                display: true
              }],
            }
          }
        });

      }
    )

    this.valeur_multiplie_par_ponderation = [];
    this.sous_rubriques_depend_une_rubrique = [];
    this.periode_diagramme = [];
    // this.suivi_avancement_constat_sur_valeur_cible = [];
   }

}
