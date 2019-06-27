import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { Constats } from 'app/Model/Constats';
import { ConstatService } from 'app/Services/constat.service';

@Component({
  selector: 'app-ajout-constat',
  templateUrl: './ajout-constat.component.html',
  styleUrls: ['./ajout-constat.component.scss']
})
export class AjoutConstatComponent implements OnInit {

  constatForm : FormGroup;
  submitted  = false;

  constructor(private constatService : ConstatService, private formBuilder : FormBuilder, public matDialogRef : MatDialogRef<AjoutConstatComponent>) 
  { }

  ngOnInit() 
  {
    // Validation du formulaire "constatForm"
    this.constatForm = this.formBuilder.group({
      id_marche : [null, Validators.required],
      id_rubrique : [null, Validators.required],
      id_sous_rubrique : [null, Validators.required],
      id_periode : [null, Validators.required],
      valeur_constat : [null, Validators.required]
    });
  }

  // Ajouter nouvelle ligne de constat
  constat = new Constats();

  // Récupértion des valeurs depuis le formulaire "formConstat"
  valeurForm()
  {
    this.constat.id_marche = this.constatForm.get('id_marche').value;
    this.constat.id_rubrique = this.constatForm.get('id_rubrique').value;
    this.constat.id_sous_rubrique = this.constatForm.get('id_sous_rubrique').value;
    this.constat.id_periode = this.constatForm.get('id_periode').value;
    this.constat.valeur_constat = this.constatForm.get('valeur_constat').value;
  }

  ajouterConstat()
  {
    if(this.constatForm.invalid)
    {
      return;
    }
    else
    {
      this.valeurForm();
      this.submitted = true;
      
      console.log('constat :', this.constat)

      this.constatService.constatStore(this.constat)
      .subscribe(
        response => { this.matDialogRef.close(),
        console.log('ajout : ', response) }
      )
    }
  }

  // Bouton fermer 
  onClose()
  {
    this.matDialogRef.close();
  }

}
