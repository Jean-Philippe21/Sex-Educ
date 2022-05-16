import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerificationInfosConnexionPage } from './verification-infos-connexion.page';

const routes: Routes = [
  {
    path: '',
    component: VerificationInfosConnexionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerificationInfosConnexionPageRoutingModule {}
