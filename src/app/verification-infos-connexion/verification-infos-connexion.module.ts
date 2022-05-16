import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerificationInfosConnexionPageRoutingModule } from './verification-infos-connexion-routing.module';

import { VerificationInfosConnexionPage } from './verification-infos-connexion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerificationInfosConnexionPageRoutingModule
  ],
  declarations: [VerificationInfosConnexionPage]
})
export class VerificationInfosConnexionPageModule {}
