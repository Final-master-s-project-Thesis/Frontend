import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'general',
    loadChildren: () => import('./pages/general/general.routes').then((m) => m.routes),
  },
  {
    path: 'search',
    loadChildren: () => import('./pages/search/search.routes').then((m) => m.routes),
  },
  {
    path: 'compare',
    loadChildren: () => import('./pages/compare/compare.routes').then((m) => m.routes),
  },
  {
    path: 'similar',
    loadChildren: () => import('./pages/similar/similar.routes').then((m) => m.routes),
  },
  {
    path: 'player',
    loadChildren: () => import('./pages/player/player.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: '/general',
    pathMatch: 'full',
  },
];
