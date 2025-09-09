import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Similar } from './similar';

export const routes: Routes = [{ path: '', component: Similar }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SimilarRoutingModule {}
