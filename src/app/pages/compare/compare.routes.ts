import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Compare } from './compare';

export const routes: Routes = [{ path: '', component: Compare }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CompareRoutingModule {}
