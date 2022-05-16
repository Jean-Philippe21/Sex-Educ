import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateContenuPageRoutingModule } from './create-contenu-routing.module';

import { CreateContenuPage } from './create-contenu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateContenuPageRoutingModule
  ],
  declarations: [CreateContenuPage]
})
export class CreateContenuPageModule {}
