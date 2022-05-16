import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateContenuPage } from './create-contenu.page';

const routes: Routes = [
  {
    path: '',
    component: CreateContenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateContenuPageRoutingModule {}
