import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Periodes } from 'app/Model/Periodes';
import { HttpClient } from '@angular/common/http';
import Chart = require('chart.js');
import { ConstatService } from 'app/Services/constat.service';
import { Constats } from 'app/Model/Constats';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { MarcheService } from 'app/Services/marche.service';
import { Marches } from 'app/Model/Marches';
import { SousRubriqueService } from 'app/Services/sous-rubrique.service';
import { SousRubriques } from 'app/Model/SousRubriques';
import { PeriodeService } from 'app/Services/periode.service';
import { RubriqueService } from 'app/Services/rubrique.service';
import { Rubriques } from 'app/Model/Rubriques';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { SousRubriqueViewService } from 'app/Services/sous-rubrique-view.service';
import { SousRubriqueView } from 'app/Model/SousRubriqueView';
import { RubriqueViewService } from 'app/Services/rubrique-view.service';
import { RubriqueView } from 'app/Model/RubriqueView';
import { MarcheView } from 'app/Model/MarcheView';
import { MarcheViewService } from 'app/Services/marche-view.service';
import { MatSort } from '@angular/material/sort';
import { TableInformationsView } from 'app/Model/TableInformationsView';
import { TableInformationsViewService } from 'app/Services/table-informations-view.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { DistinctPeriodesService } from 'app/Services/distinct-periodes.service';
import { DistinctPeriodes } from 'app/Model/distinctPeriodes';
import { FiltreDateTableInfosGenerale } from 'app/Model/FiltreDateTableInfosGenerale';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /* -------------------------------------- Tables -------------------------------------- */

  // DataSource & DisplayedColumns pour la table Informations VIEW
  displayed_columns_table_informations : string[] = ['marche', 'rubrique', 'sous_rubrique', 'periode', 'valeur_cible', 'valeur_constat'];
  table_informations : TableInformationsView[] = [];
  data_source_table_informations_view = new MatTableDataSource<TableInformationsView>(this.table_informations);

  // DataSource & DisplayedColumns pour la table MARCHE
  displayed_columns_marche: string[] = ['id_marche', 'num_marche', 'intitule', 'duree_jour', 'duree_mois', 'montant_marche'];
  marche_data_table : Marches[] = [];
  data_source_marche = new MatTableDataSource<Marches>(this.marche_data_table);

  // DataSource & DisplayedColumns pour la table SOUS-RUBRIQUE VIEW
  displayed_columns_sous_rubrique_avancement: string[] = ['marche', 'rubrique', 'sous_rubrique', 'periode', 'taux_avancement_sous_rubrique', 'progress_bar'];
  sous_rubrique_avancement_data_table : SousRubriqueView[] = [];
  data_source_sous_rubrique_view = new MatTableDataSource<SousRubriqueView>(this.sous_rubrique_avancement_data_table);

  // DataSource & DisplayedColumns pour la table RUBRIQUE VIEW
  displayed_columns_rubrique_avancement : string[] = ['marche', 'rubrique', 'periode', 'taux_avancement_rubrique', 'progress_bar'];
  rubrique_avancement_data_table : RubriqueView[] = [];
  data_source_rubrique_view = new MatTableDataSource<RubriqueView>(this.rubrique_avancement_data_table);

  // DataSource & DisplayedColumns pour la table MARCHE VIEW
  displayed_columns_marche_avancement : string[] = ['marche', 'periode', 'taux_avancement_marche', 'progress_bar'];
  marche_avancement_data_table : MarcheView[] = [];
  data_source_marche_view = new MatTableDataSource<MarcheView>(this.marche_avancement_data_table);


  // Afficher le progress spinner
  progress = true;

  // La pagination de la table marché
  @ViewChild(MatPaginator) paginator_marche : MatPaginator;

  // La pagination & Trie de la table informations générale view
  @ViewChild('paginator_informations_view') paginator_informations_view : MatPaginator;
  @ViewChild('sort_informations_view') sort_informations_view: MatSort;
  pipe: DatePipe;

  // La pagination de la table sous-rubrique view 
  @ViewChild('paginator_sous_rubrique_view') paginator_sous_rubrique_view : MatPaginator;
  @ViewChild('sort_sous_rubrique_view') sort_sous_rubrique_view: MatSort;

  // La pagination de la table rubrique view
  @ViewChild('paginator_rubrique_view') paginator_rubrique_view : MatPaginator;
  @ViewChild('sort_rubrique_view') sort_rubrique_view: MatSort;


  // La pagination & Trie de la table marche view
  @ViewChild('paginator_marche_view') paginator_marche_view : MatPaginator;
  @ViewChild('sort_marche_view') sort_marche_view: MatSort;

  distinctPeriodes : DistinctPeriodes[];


  /* -------------------- Filtre de date -------------------- */

  // Filtre de date poutr la table informations générale
  filtreForm : FormGroup;
  distinct_periode_valeur : DistinctPeriodes;
  
  // Valeur du marché seléctionné depuis le select pour le filtrage
  valeur_marche_selectionne_pour_filtre : Number;

  // Valeur de la rubrique seléctionné depuis le select pour le filtrage
  valeur_rubrique_selectionee_pour_filtre : Number;

  // Valeur de la sous-rubrique seléctionnée depuis le select pour le filtrage
  valeur_sous_rubrique_selectionee_pour_filtre : Number;

  /* -------------------- Filtre de date -------------------- */


  /* -------------------------------------- Fin tables -------------------------------------- */

  // public lineChartLabels = ['P1', 'P2', 'P3', 'P4'];
  // public lineChartData = [0, 25, 90, 55];
  // public lineChartType = 'line';

  /* -------------------------------------- Variables de diagrammes -------------------------------------- */
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
  sous_rubriques_depend_rubrique_pour_filtre : SousRubriques[] = [];

  // Liste des rubriques
  rubriquesList : Rubriques[];
  rubriques_depend_marche_pour_filtre : Rubriques[] = [];

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

  /* -------------------------------------- Fin de Variables de diagrammes -------------------------------------- */
   

  /* --------------------------------- Variables de taux d'avancement --------------------------------- */

  // Liste des sous-rubrique pour le taux d'avancement
  // liste_des_sous_rubriques_avancement : [];
  avancement_des_sous_rubriques : SousRubriqueView[];

  liste_des_sous_rubriques : SousRubriques[];

  // Valeur de la sous-rubrique récupéré du Select
  valeur_sous_rubrique : Number;

  // Le calcule du taux d'avancement
  taux_avancement : Number;

  // Pour ne pas afficher le résulat tant que n'est plus calculé 
  isLoading = false;

  /* --------------------------------- Variables de taux d'avancement --------------------------------- */
  constructor(private distinctPeriodesViewService : DistinctPeriodesService, private tableInformationViewService : TableInformationsViewService, private marcheViewService : MarcheViewService, private rubriqueViewService : RubriqueViewService, private sousRubriqueViewService : SousRubriqueViewService, private rubriqueService : RubriqueService, private constatService : ConstatService, private periodService : PeriodeService, private sousRubriqueService : SousRubriqueService, private marcheService : MarcheService, private formBuilder : FormBuilder, private http : HttpClient, private changeDetectorRef : ChangeDetectorRef) 
  { 
    // Filtrage de la table Information Générale ! 
    this.pipe = new DatePipe('en');
    this.data_source_table_informations_view.filterPredicate = (data, filtrer) =>
    {
      if (this.date_debut && this.date_fin && this.id_marche && this.id && this.id_sous_rubrique) 
      {
        console.log('infos : ', this.date_debut, this.date_fin, this.id_marche, this.id, this.id_sous_rubrique)
        return data.periode >= this.date_debut && data.periode <= this.date_fin && data.marche == this.id_marche && data.rubrique == this.id && data.sous_rubrique == this.id_sous_rubrique
      }
      return true;
    }
  }

  // Filtre de date pour la table d'Informations générale
  filtrer() 
  {
    this.data_source_table_informations_view.filter = '' + Math.random();
  }

  ngOnInit()
  {
    // Remplir le select du marché 
    this.marcheService.marcheList()
    .subscribe(
      response => 
      {
        this.marchesList = response;
      }
    );

    // récupéré la liste des rubriques, afin de remplir le SELECT de la rubrique qui correspond le marché
    this.rubriqueService.rubriqueList()
    .subscribe(
      response =>
      {
        this.rubriquesList = response
      }
    )

    // Remplir le SELECT de la sous-rubrique
    this.sousRubriqueService.sousRubriqueList()
    .subscribe(
      response =>
      {
        this.sousRubriquesList = response;
        this.liste_des_sous_rubriques = response;
      }
     )

    // Sélectionner la liste des périodes distinguée, afin d'afficher pour le filtrage
    this.distinctPeriodesViewService.distinctPeriodeViewList()
    .subscribe(
      response =>
      {
        this.distinctPeriodes = response;
      }
    )

    // Avoir la liste des constats, afin de calculer le taux d'avencement sur le DataTable sous-rubrique
    // this.constatService.constatList()
    // .subscribe(
    //   (response : Constats[]) => 
    //   {
    //     this.constatsList = response;
    //   }
    // );


    // Le dataTable marché
    // this.afficherDataTableMarches();

    // le DataTable informations générales view
    this.afficherDataTableInformationsView();

    // Le dataTable marche view
    this.afficherDataTableMarcheView();

    // Le dataTable sous-rubrique-view
    this.afficherDataTableSousRubriqueView();

    // Le dataTable sous-rubrique-view
    this.afficherDataTableRubriqueView();

    // La pagination de la table informations view
    this.data_source_table_informations_view.paginator = this.paginator_informations_view;
    this.data_source_table_informations_view.sort = this.sort_informations_view;

    // La pagination de la table marché view
    this.data_source_marche_view.paginator = this.paginator_marche_view;
    this.data_source_marche_view.sort = this.sort_marche_view;

    // La pagination de la table rubrique view
    this.data_source_rubrique_view.paginator = this.paginator_rubrique_view;
    this.data_source_rubrique_view.sort = this.sort_rubrique_view;

    // La pagination de la table sous-rubrique view
    this.data_source_sous_rubrique_view.paginator = this.paginator_sous_rubrique_view; 
    this.data_source_sous_rubrique_view.sort = this.sort_sous_rubrique_view;



    // Affichage du taux d'avanacement : remplir le select de la sous-rubrique
    this.sousRubriqueViewService.sousRubriqueViewList()
    .subscribe(
      response => 
      {
        this.avancement_des_sous_rubriques = response;
      }
    )

    // Récupéré les période 
    // this.periodService.periodeList()
    // .subscribe(
    //   response => 
    //   {
    //     this.periodesList = response;
    //     console.log(this.periodesList)
    //   }
    // )
    

    // Validation
    // this.constatFrom = this.formBuilder.group({
    //   id_sous_rubrique : [null, Validators.required]
    // })

    // Validation de filtre de la table Informations Génerales
    // this.filtreForm = this.formBuilder.group({
    //   id_marche : [null, Validators.required],
    //   id : [null, Validators.required],
    //   id_sous_rubrique : [null, Validators.required]
    // });

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

    // Validations pour le filtrage de la table Informations Générale
    this.filtreForm = new FormGroup({
      date_debut: new FormControl(null, Validators.required),
      date_fin: new FormControl(null, Validators.required),
      id_marche : new FormControl(null, Validators.required),
      id : new FormControl(null, Validators.required),
      id_sous_rubrique : new FormControl(null, Validators.required)
    });
    
  }

  // Valeur du SELECT, pour le filtrage de la table Informations Générale
  get date_debut() 
  { 
    return this.filtreForm.get('date_debut').value; 
  }

  get date_fin() 
  { 
    return this.filtreForm.get('date_fin').value; 
  }

  get id_marche() : String
  {
    // return this.filtreForm.get('id_marche').value;

    var id_marche_recupere = this.filtreForm.get('id_marche').value;

    for(let marche of this.marchesList)
    {
      if(id_marche_recupere === marche.id_marche)
      {
        return marche.intitule
      }
    }
  }

  get id() : String
  {
    // return this.filtreForm.get('id').value;
    var id_rubrique_recupere = this.filtreForm.get('id').value;

    for(let rubrique of this.rubriques_depend_marche_pour_filtre)
    {
      if(id_rubrique_recupere === rubrique.id)
      {
        return rubrique.lib_rubrique
      }
    }
  }

  get id_sous_rubrique() : String
  {
    // return this.filtreForm.get('id_sous_rubrique').value;

    var id_sous_rubrique_recupere = this.filtreForm.get('id_sous_rubrique').value;

    for(let sous_rubrique of this.sous_rubriques_depend_rubrique_pour_filtre)
    {
      if(id_sous_rubrique_recupere === sous_rubrique.id_sous_rubrique)
      {
        return sous_rubrique.lib_sous_rubrique
      }
    }
  }



  /* --------------------------------- Fonctions de remplissage des tables --------------------------------- */
  // fonction qui remplie la table des marchés
  // afficherDataTableMarches()
  // {
  //   this.marcheService.marcheList()
  //   .subscribe(
  //     (response : Marches[]) => 
  //     {
  //       this.progress = false;
  //       this.data_source_marche.data = response;        
  //     }
  //   )
  // }

  // fonction qui remplie la table des informations générales view
  afficherDataTableInformationsView()
  {
    this.tableInformationViewService.tableInformationsList()
    .subscribe(
      (response : TableInformationsView[]) => 
      {
        this.progress = false;
        this.data_source_table_informations_view.data = response;
      }
    )
  }

  // fonction qui remplie la table des marché view
  afficherDataTableMarcheView()
  {
    this.marcheViewService.marcheViewList()
    .subscribe(
      (response : MarcheView[]) =>
      {
        this.progress = false;
        this.data_source_marche_view.data = response;
      }
    )
  }

  // fonction qui remplie la table sous-rubrique-view
  afficherDataTableSousRubriqueView()
  {
    this.sousRubriqueViewService.sousRubriqueViewList()
    .subscribe(
      response => 
      {
        this.progress = false;
        this.data_source_sous_rubrique_view.data = response;
      } 
    )
  }

  // fonction qui remplie la table rubrique-view
  afficherDataTableRubriqueView()
  {
    this.rubriqueViewService.rubriqueViewList()
    .subscribe(
      response =>
      {
        this.progress = false;
        this.data_source_rubrique_view.data = response;
      }
    )
  }

  // Fonction qui calcule le taux d'avancement d'une sous-rubrique seléctionnée
  calculeTauxAvancement()
  {
    // Valeur de la sous-rubrique récupéré
    this.valeur_sous_rubrique = this.sousRubriqueForm.get('id_sous_rubrique').value;

    // Diagramme selon la selection de la sous-rubrique
    this.http.get<Constats[]>('http://localhost:8000/api/constat')
    .subscribe((results: Constats[]) => 
    {
      
      for(let constat of results)
      {
        for(let sous_rubrique of this.liste_des_sous_rubriques)
        {
          // for(let periode of this.periodesList)
          // {
            if(this.valeur_sous_rubrique == sous_rubrique.id_sous_rubrique && this.valeur_sous_rubrique == constat.id_sous_rubrique)
            {
              this.taux_avancement = (constat.valeur_constat / sous_rubrique.valeur_cible);
              this.isLoading = true;
            }
          // }
        }
      }
    });
  }

  // Fonction qui affiche le diagramme de a rubrique
  afficherDiagrammeMarche()
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

  // Fonction pour afficher le diagramme de la Rubrique
  afficherDiagrammeRubrique()
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

  // Fonction pour afficher le diagramme de la sous-rubrique
  afficherDiagrammeSousRubrique()
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


  /* --------------------- Filtrage (Material Angular Data Table) pour les tables : Marché, Rubrique, Sous-rubrique. --------------------- */
  // Filtre du dataTable InformationsView
  filtrerInformationsView(filterValue: string)
  {
    this.data_source_table_informations_view.filter = filterValue.trim().toLowerCase();
    
    if (this.data_source_table_informations_view.paginator) 
    {
      this.data_source_table_informations_view.paginator.firstPage();
    }
  }

  // Filtre du dataTable marcheView
  filtrerMarcheView(filterValue: string) 
  {
    this.data_source_marche_view.filter = filterValue.trim().toLowerCase();

    if (this.data_source_marche_view.paginator) {
      this.data_source_marche_view.paginator.firstPage();
    }
  }

  // Filtre du dataTable rubriqueView
  filtrerRubriqueView(filterValue: string)
  {
    this.data_source_rubrique_view.filter = filterValue.trim().toLowerCase();
    
    if (this.data_source_rubrique_view.paginator) {
      this.data_source_rubrique_view.paginator.firstPage();
    }
  }

  // Filtre du dataTable SousRubriqueView
  filtrerSousRubriqueView(filterValue: string)
  {
    this.data_source_sous_rubrique_view.filter = filterValue.trim().toLowerCase();
    
    if (this.data_source_sous_rubrique_view.paginator) {
      this.data_source_sous_rubrique_view.paginator.firstPage();
    }
  }
  /* --------------------- Fin filtrage (Material Angular Data Table) pour les tables : Marché, Rubrique, Sous-rubrique. --------------------- */



  /* ---------------------------------- Filtre pour la table Informations Générale  ---------------------------------- */

  // Avoir la valeur du l'élément seléctionné (du marché), afin de remplir le SELECT suivant (de la rubrique)
  remplirSelectRubriqueDependMarcheSelectionne()
  {
    this.valeur_marche_selectionne_pour_filtre = this.filtreForm.get('id_marche').value;

    // Vider le SELECT pour remplir les nouvelles données du marché seléctionnée
    this.rubriques_depend_marche_pour_filtre = [];

    // Remplir le SELECT du rubrique
    for(let rubrique of this.rubriquesList)
    {
      if(this.valeur_marche_selectionne_pour_filtre == rubrique.id_marche)
      {
        this.rubriques_depend_marche_pour_filtre.push(rubrique);
      }
    }
  }

  // Avoir la valeur du l'élément seléctionné (du rubrique), afin de remplir le SELECT suivant (de la sous-rubrique)
  remplirSelectSousRubriqueDependRubriqueSelectionnee()
  {
    this.valeur_rubrique_selectionee_pour_filtre = this.filtreForm.get('id').value;

    // Vider le SELECT pour remplir les nouvelles données du rubrique seléctionnée
    this.sous_rubriques_depend_rubrique_pour_filtre = [];

    // Remplir le SELECT du sous-rubrique
    for(let sous_rubrique of this.sousRubriquesList)
    {
      if(this.valeur_rubrique_selectionee_pour_filtre == sous_rubrique.id_rubrique)
      {
        this.sous_rubriques_depend_rubrique_pour_filtre.push(sous_rubrique);
      }
    }
  }

  // Avoir la valeur du l'élément seléctionné (du rubrique), afin de remplir le SELECT suivant (de la sous-rubrique)
  avoirValeurSousRubrique()
  {
    this.valeur_sous_rubrique_selectionee_pour_filtre = this.filtreForm.get('id_sous_rubrique').value;
  }
  /* ---------------------------------- Fin de filtre pour la table Informations Générale  ---------------------------------- */

}
