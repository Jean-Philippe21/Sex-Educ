import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PreMessageriePageRoutingModule } from './pre-messagerie-routing.module';

import { PreMessageriePage } from './pre-messagerie.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PreMessageriePageRoutingModule
  ],
  declarations: [PreMessageriePage]
})
export class PreMessageriePageModule {}
