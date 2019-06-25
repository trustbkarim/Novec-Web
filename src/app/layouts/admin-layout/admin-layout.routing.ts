import { Routes } from '@angular/router';

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

export const AdminLayoutRoutes: Routes = [
    { path: 'user',           component: UserComponent },
    { path: 'dashboard',      component: HomeComponent },
    { path: 'constat',        component: ConstatComponent },
    { path: 'marche',         component: MarcheComponent },
    { path: 'OrdresService',  component: OrdreServiceComponent },
    { path: 'paiement',       component: PaiementComponent },
    { path: 'periode',        component: PeriodeComponent },
    { path: 'rubrique',       component: RubriqueComponent },
    { path: 'sousRubrique',   component: SousRubriqueComponent },
    // { path: 'typography',     component: TypographyComponent },   
];
