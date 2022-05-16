import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PublicationDiscussionPage } from './publication-discussion.page';

const routes: Routes = [
  {
    path: '',
    component: PublicationDiscussionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicationDiscussionPageRoutingModule {}
