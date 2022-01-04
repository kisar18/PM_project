import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SportDetailPageRoutingModule } from './sport-detail-routing.module';

import { SportDetailPage } from './sport-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SportDetailPageRoutingModule
  ],
  declarations: [SportDetailPage]
})
export class SportDetailPageModule {}
