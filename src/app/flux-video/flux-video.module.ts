import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FluxVideoPageRoutingModule } from './flux-video-routing.module';

import { FluxVideoPage } from './flux-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FluxVideoPageRoutingModule
  ],
  declarations: [FluxVideoPage]
})
export class FluxVideoPageModule {}
