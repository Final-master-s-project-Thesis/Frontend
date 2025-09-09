import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Search } from './search';

export const routes: Routes = [{ path: '', component: Search }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SearchRoutingModule {}
