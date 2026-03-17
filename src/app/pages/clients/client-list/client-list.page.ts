import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { Client } from '../../../models/client.model';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-list-page',
  imports: [
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    RouterLink,
    DatePipe,
    MatSnackBarModule,
  ],
  templateUrl: './client-list.page.html',
  styleUrl: './client-list.page.scss',
})
export class ClientListPage implements OnInit {
  clients: Client[] = [];
  displayedColumns = ['fullName', 'birthDate', 'email', 'actions'];

  constructor(
    private readonly clientService: ClientService,
    private readonly snackBar: MatSnackBar,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.refreshClients();

    const message = this.router.getCurrentNavigation()?.extras?.state?.['message'] as
      | string
      | undefined;
    if (message) {
      this.snackBar.open(message, 'Fechar', { duration: 3000 });
    }
  }

  remove(id: number): void {
    this.clientService.remove(id);
    this.refreshClients();
  }

  private refreshClients(): void {
    this.clients = this.clientService.list();
  }
}
