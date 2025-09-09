import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { General } from './general';

export const routes: Routes = [{ path: '', component: General }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralRoutingModule {}
