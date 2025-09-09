import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'general',
    loadComponent: () => import('./pages/general/general').then((m) => m.General),
  },
  {
    path: 'search',
    loadComponent: () => import('./pages/search/search').then((m) => m.Search),
  },
  {
    path: 'compare',
    loadComponent: () => import('./pages/compare/compare').then((m) => m.Compare),
  },
  {
    path: 'similar',
    loadComponent: () => import('./pages/similar/similar').then((m) => m.Similar),
  },
  {
    path: 'player',
    loadComponent: () => import('./pages/player/player').then((m) => m.Player),
  },
  {
    path: 'filter-leagues',
    loadChildren: () =>
      import('./pages/filter-leagues/filter-leagues.routes').then((m) => m.routes),
  },
  {
    path: 'filter-clubs',
    loadChildren: () => import('./pages/filter-teams/filter-teams.routes').then((m) => m.routes),
  },
  {
    path: '',
    redirectTo: '/general',
    pathMatch: 'full',
  },
];
