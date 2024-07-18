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
    canActivate: [authorizedGuard]
  },
  {
    path: 'login',
    loadComponent: () => import('./views/login/login.component').then((m) => m.LoginComponent),
  }
];
