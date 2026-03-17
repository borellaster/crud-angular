import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { AppShellComponent } from './layout/app-shell.component';
import { ClientFormPage } from './pages/clients/client-form/client-form.page';
import { ClientListPage } from './pages/clients/client-list/client-list.page';
import { LoginPage } from './pages/login/login.page';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
  },
  {
    path: '',
    component: AppShellComponent,
    canActivate: [authGuard],
    children: [
      {
        path: 'clientes',
        component: ClientListPage,
      },
      {
        path: 'clientes/novo',
        component: ClientFormPage,
      },
      {
        path: 'clientes/editar/:id',
        component: ClientFormPage,
      },
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'clientes',
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];
