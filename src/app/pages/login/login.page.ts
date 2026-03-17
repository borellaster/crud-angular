import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DxButtonModule, DxTextBoxModule } from 'devextreme-angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  imports: [FormsModule, DxTextBoxModule, DxButtonModule],
  templateUrl: './login.page.html',
  styleUrl: './login.page.scss',
})
export class LoginPage implements OnInit {
  email = '';
  password = '';
  errorMessage = '';

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      void this.router.navigate(['/clientes']);
    }
  }

  submit(): void {
    this.errorMessage = '';
    const success = this.authService.login(this.email, this.password);

    if (!success) {
      this.errorMessage = 'Preencha e-mail e senha para continuar.';
      return;
    }

    void this.router.navigate(['/clientes']);
  }
}
