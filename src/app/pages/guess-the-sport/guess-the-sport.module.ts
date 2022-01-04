import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuessTheSportPageRoutingModule } from './guess-the-sport-routing.module';

import { GuessTheSportPage } from './guess-the-sport.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuessTheSportPageRoutingModule
  ],
  declarations: [GuessTheSportPage]
})
export class GuessTheSportPageModule {}
