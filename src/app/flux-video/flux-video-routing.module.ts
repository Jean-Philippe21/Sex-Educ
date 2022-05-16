import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FluxVideoPage } from './flux-video.page';

const routes: Routes = [
  {
    path: '',
    component: FluxVideoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FluxVideoPageRoutingModule {}
