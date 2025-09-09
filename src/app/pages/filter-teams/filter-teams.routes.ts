import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FilterTeams } from './filter-teams';

export const routes: Routes = [{ path: '', component: FilterTeams }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FilterTeamsRoutingModule {}
