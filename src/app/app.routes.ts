import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { ClientsPage } from './pages/clients/clients.page';
import { LoginPage } from './pages/login/login.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: 'clientes',
    component: ClientsPage,
    canActivate: [authGuard],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
