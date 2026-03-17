import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'crud-angular-auth';

  login(email: string, password: string): boolean {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    localStorage.setItem(this.storageKey, 'true');
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }
}
