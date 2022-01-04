import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuessTheSportPage } from './guess-the-sport.page';

const routes: Routes = [
  {
    path: '',
    component: GuessTheSportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuessTheSportPageRoutingModule {}
