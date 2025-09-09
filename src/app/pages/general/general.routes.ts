import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { General } from './general';

export const routes: Routes = [
  { path: '', component: General },
  {
    path: 'filter-leagues',
    loadChildren: () => import('../filter-leagues/filter-leagues.routes').then((m) => m.routes),
  },
  {
    path: 'filter-teams',
    loadChildren: () => import('../filter-teams/filter-teams.routes').then((m) => m.routes),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
