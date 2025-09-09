import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterLeagues } from './filter-leagues';

export const routes: Routes = [{ path: '', component: FilterLeagues }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterLeaguesRoutingModule {}
