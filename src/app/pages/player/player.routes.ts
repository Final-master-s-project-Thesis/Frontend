import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Player } from './player';

export const routes: Routes = [{ path: '', component: Player }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlayerRoutingModule {}
