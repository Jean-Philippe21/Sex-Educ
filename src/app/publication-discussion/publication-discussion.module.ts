import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PublicationDiscussionPageRoutingModule } from './publication-discussion-routing.module';

import { PublicationDiscussionPage } from './publication-discussion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PublicationDiscussionPageRoutingModule
  ],
  declarations: [PublicationDiscussionPage]
})
export class PublicationDiscussionPageModule {}
