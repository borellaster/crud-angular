import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientService } from '../../../services/client.service';

@Component({
  selector: 'app-client-form-page',
  imports: [
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './client-form.page.html',
  styleUrl: './client-form.page.scss',
})
export class ClientFormPage implements OnInit {
  private readonly formBuilder = inject(FormBuilder);

  editingId: number | null = null;

  readonly form = this.formBuilder.group({
    fullName: ['', [Validators.required]],
    birthDate: [null as Date | null, [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly snackBar: MatSnackBar,
    private readonly clientService: ClientService,
  ) {}

  get isEditMode(): boolean {
    return this.editingId !== null;
  }

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');

    if (!idParam) {
      return;
    }

    const id = Number(idParam);
    if (Number.isNaN(id)) {
      this.backToListWithMessage('ID de cliente invalido.');
      return;
    }

    const client = this.clientService.getById(id);
    if (!client) {
      this.backToListWithMessage('Cliente nao encontrado.');
      return;
    }

    this.editingId = client.id;
    this.form.patchValue({
      fullName: client.fullName,
      birthDate: client.birthDate,
      email: client.email,
    });
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const fullName = this.form.value.fullName?.trim() ?? '';
    const birthDate = this.form.value.birthDate ?? null;
    const email = this.form.value.email?.trim() ?? '';

    if (!fullName || !birthDate || !email) {
      return;
    }

    if (this.isEditMode) {
      this.clientService.update(this.editingId as number, { fullName, birthDate, email });
      void this.router.navigate(['/clientes'], { state: { message: 'Cliente atualizado.' } });
      return;
    }

    this.clientService.create({ fullName, birthDate, email });
    void this.router.navigate(['/clientes'], { state: { message: 'Cliente cadastrado.' } });
  }

  cancel(): void {
    void this.router.navigate(['/clientes']);
  }

  private backToListWithMessage(message: string): void {
    this.snackBar.open(message, 'Fechar', { duration: 2500 });
    void this.router.navigate(['/clientes'], { state: { message } });
  }
}
