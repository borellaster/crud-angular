import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  private clients: Client[] = [
    {
      id: 1,
      fullName: 'Maria Oliveira',
      birthDate: new Date(1992, 4, 10),
      email: 'maria.oliveira@email.com',
    },
  ];

  private nextId = 2;

  list(): Client[] {
    return [...this.clients];
  }

  getById(id: number): Client | undefined {
    return this.clients.find((client) => client.id === id);
  }

  create(payload: Omit<Client, 'id'>): Client {
    const client: Client = {
      id: this.nextId++,
      ...payload,
    };

    this.clients = [...this.clients, client];
    return client;
  }

  update(id: number, payload: Omit<Client, 'id'>): Client | null {
    const index = this.clients.findIndex((client) => client.id === id);

    if (index < 0) {
      return null;
    }

    const updated: Client = {
      id,
      ...payload,
    };

    this.clients = this.clients.map((client) => (client.id === id ? updated : client));
    return updated;
  }

  remove(id: number): void {
    this.clients = this.clients.filter((client) => client.id !== id);
  }
}
