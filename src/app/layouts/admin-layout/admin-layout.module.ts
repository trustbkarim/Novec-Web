import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";

import { LbdModule } from '../../lbd/lbd.module';
import { NguiMapModule} from '@ngui/map';

import { AdminLayoutRoutes } from './admin-layout.routing';

import { HomeComponent } from '../../home/home.component';
import { UserComponent } from '../../user/user.component';
import { TypographyComponent } from '../../typography/typography.component';
import { ConstatComponent } from 'app/constat/constat.component';
import { MarcheComponent } from 'app/marche/marche.component';
import { OrdreServiceComponent } from 'app/ordre-service/ordre-service.component';
import { PaiementComponent } from 'app/paiement/paiement.component';
import { PeriodeComponent } from 'app/periode/periode.component';
import { RubriqueComponent } from 'app/rubrique/rubrique.component';
import { SousRubriqueComponent } from 'app/sous-rubrique/sous-rubrique.component';

// Chart js
import { ChartsModule } from 'ng2-charts';

// Material Angular
import { MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { AjoutConstatComponent } from 'app/constat/ajout-constat/ajout-constat.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ConstatService } from 'app/Services/constat.service';
import { EditeConstatComponent } from 'app/constat/edite-constat/edite-constat.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material';





@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    LbdModule,
    // NguiMapModule.forRoot({apiUrl: 'https://maps.google.com/maps/api/js?key=YOUR_KEY_HERE'}),

    // Material Angular
    ReactiveFormsModule,
    MatTableModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressBarModule,
    MatTabsModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,

    // Chart module 
    ChartsModule,
    
  ],
  declarations: [
    HomeComponent,
    UserComponent,
    TypographyComponent,
    ConstatComponent,
    MarcheComponent,
    OrdreServiceComponent,
    PaiementComponent,
    PeriodeComponent,
    RubriqueComponent,
    SousRubriqueComponent,
    AjoutConstatComponent,
    EditeConstatComponent

  ], 
  providers : [
    // ConstatService,
    MatDatepickerModule,
  ],
  entryComponents : [
    AjoutConstatComponent,
    EditeConstatComponent,

  ],
})

export class AdminLayoutModule {}
