import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConstatService } from 'app/Services/constat.service';
import { Constats } from 'app/Model/Constats';

@Component({
  selector: 'app-edite-constat',
  templateUrl: './edite-constat.component.html',
  styleUrls: ['./edite-constat.component.scss']
})
export class EditeConstatComponent implements OnInit {

  constatForm : FormGroup;
  submitted  = false;

  // Une fois cliqué sur 'Editer', je récupére l'objet complet, puis je le mets dans la variable suivante
  constatDialog : Constats;

  constructor(public constatService : ConstatService, @Inject(MAT_DIALOG_DATA) public data: any, private formBuilder : FormBuilder, public matDialogRef : MatDialogRef<EditeConstatComponent>) 
  { 
    this.constatDialog = data.item;
  }

  ngOnInit() 
  {
    // Validation du formulaire "constatForm"
    this.constatForm = this.formBuilder.group({
      id_marche : [this.constatDialog ? this.constatDialog.id_marche : null, [Validators.required]],
      id_rubrique : [this.constatDialog ? this.constatDialog.id_rubrique : null, [Validators.required]],
      id_sous_rubrique : [this.constatDialog ? this.constatDialog.id_sous_rubrique : null, [Validators.required]],
      id_periode : [this.constatDialog ? this.constatDialog.id_periode : null, [Validators.required]],
      valeur_constat : [this.constatDialog ? this.constatDialog.valeur_constat : null, [Validators.required]]
    });
  }


  // constat : Constats = { id : undefined, id_marche : undefined, id_periode: undefined, id_rubrique: undefined, id_sous_rubrique: undefined, valeur_constat : undefined };
  // Récupértion des valeurs depuis le formulaire "formConstat"
  valeurForm()
  {
    this.constatDialog.id_marche = this.constatForm.get('id_marche').value;
    this.constatDialog.id_rubrique = this.constatForm.get('id_rubrique').value;
    this.constatDialog.id_sous_rubrique = this.constatForm.get('id_sous_rubrique').value;
    this.constatDialog.id_periode = this.constatForm.get('id_periode').value;
    this.constatDialog.valeur_constat = this.constatForm.get('valeur_constat').value;
  }

  editer()
  {
    if(this.constatForm.invalid)
    {
      return;
    }
    else
    {
      this.valeurForm();
      this.submitted = true;
       
      console.log('constat :', this.constatDialog)

      this.constatService.constatEdit(this.constatDialog, this.constatDialog.id)
      .subscribe(
        response => this.matDialogRef.close()
      )
    }
  }

  // Bouton fermer 
  onClose()
  {
    this.matDialogRef.close();
  }
}
