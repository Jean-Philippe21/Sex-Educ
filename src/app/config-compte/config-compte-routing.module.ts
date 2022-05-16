import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigComptePage } from './config-compte.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigComptePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigComptePageRoutingModule {}
