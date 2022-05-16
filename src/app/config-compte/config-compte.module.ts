import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ConfigComptePageRoutingModule } from './config-compte-routing.module';

import { ConfigComptePage } from './config-compte.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfigComptePageRoutingModule
  ],
  declarations: [ConfigComptePage]
})
export class ConfigComptePageModule {}
