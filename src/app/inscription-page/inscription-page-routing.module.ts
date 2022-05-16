import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscriptionPagePage } from './inscription-page.page';

const routes: Routes = [
  {
    path: '',
    component: InscriptionPagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscriptionPagePageRoutingModule {}
