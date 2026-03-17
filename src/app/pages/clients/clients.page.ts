import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DxButtonModule, DxDataGridModule } from 'devextreme-angular';
import { Client } from '../../models/client.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-clients-page',
  imports: [DxDataGridModule, DxButtonModule],
  templateUrl: './clients.page.html',
  styleUrl: './clients.page.scss',
})
export class ClientsPage {
  clients: Client[] = [
    {
      id: 1,
      fullName: 'Maria Oliveira',
      birthDate: new Date(1992, 4, 10),
      email: 'maria.oliveira@email.com',
    },
  ];

  nextId = 2;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  onRowInserting(event: { data: Partial<Client> }): void {
    event.data.id = this.nextId++;
    event.data.birthDate = this.toDate(event.data.birthDate);
  }

  onRowUpdating(event: {
    oldData: Client;
    newData: Partial<Client>;
  }): void {
    if (event.newData.birthDate) {
      event.newData.birthDate = this.toDate(event.newData.birthDate);
    }
  }

  onRowRemoving(_event: { data: Client }): void {}

  logout(): void {
    this.authService.logout();
    void this.router.navigate(['/login']);
  }

  private toDate(value: unknown): Date {
    if (value instanceof Date) {
      return value;
    }

    if (typeof value === 'string' || typeof value === 'number') {
      return new Date(value);
    }

    return new Date();
  }
}
