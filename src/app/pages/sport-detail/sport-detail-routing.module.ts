import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportDetailPage } from './sport-detail.page';

const routes: Routes = [
  {
    path: '',
    component: SportDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SportDetailPageRoutingModule {}
