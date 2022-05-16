import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InscriptionPagePageRoutingModule } from './inscription-page-routing.module';

import { InscriptionPagePage } from './inscription-page.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InscriptionPagePageRoutingModule
  ],
  declarations: [InscriptionPagePage]
})
export class InscriptionPagePageModule {}
