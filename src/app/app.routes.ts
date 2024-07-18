import { Routes } from '@angular/router';
import { authorizedGuard } from './core/guards/authorized.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'board',
    pathMatch: 'full'
  },
  {
    path: 'board',
    loadComponent: () => import('./views/board/board.component').then((m) => m.BoardComponent),
    canActivate: [authorizedGuard],
    title: 'Board',
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.component').then((m) => m.LoginComponent),
    title: 'Login',
  },
  {
    path: '**',
    loadComponent: () => import('./views/not-found/not-found.component').then((m) => m.NotFoundComponent),
    title: 'Not found',
  }
];
