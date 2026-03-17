import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly storageKey = 'crud-angular-auth';
  private readonly userKey = 'crud-angular-user';

  login(email: string, password: string): boolean {
    if (!email.trim() || !password.trim()) {
      return false;
    }

    localStorage.setItem(this.storageKey, 'true');
    localStorage.setItem(this.userKey, email.trim());
    return true;
  }

  logout(): void {
    localStorage.removeItem(this.storageKey);
    localStorage.removeItem(this.userKey);
  }

  isLoggedIn(): boolean {
    return localStorage.getItem(this.storageKey) === 'true';
  }

  getUserEmail(): string | null {
    return localStorage.getItem(this.userKey);
  }
}
