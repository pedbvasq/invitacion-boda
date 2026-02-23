/**
 * SCRIPT TEMPORAL PARA CREAR USUARIO ADMINISTRADOR
 * 
 * USO:
 * 1. Agrega esta ruta temporalmente en app.routes.ts:
 *    { path: 'setup-admin', component: SetupAdmin }
 * 2. Navega a /setup-admin
 * 3. Ingresa email y contraseña
 * 4. Haz clic en "Crear Admin"
 * 5. Una vez creado, elimina este archivo y la ruta
 */

import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';

@Component({
  selector: 'app-setup-admin',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="container mt-5">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-header bg-warning">
              <h4 class="mb-0">⚠️ Setup Administrador (Temporal)</h4>
            </div>
            <div class="card-body">
              <div class="alert alert-info">
                <strong>Nota:</strong> Este componente es temporal. Úsalo solo una vez para crear el usuario administrador.
              </div>

              <form [formGroup]="setupForm" (ngSubmit)="crearAdmin()">
                <div class="mb-3">
                  <label class="form-label">Email del Administrador</label>
                  <input 
                    type="email" 
                    class="form-control" 
                    formControlName="email"
                    placeholder="admin@tuboda.com">
                </div>

                <div class="mb-3">
                  <label class="form-label">Contraseña</label>
                  <input 
                    type="password" 
                    class="form-control" 
                    formControlName="password"
                    placeholder="Mínimo 6 caracteres">
                  <small class="text-muted">Mínimo 6 caracteres</small>
                </div>

                <div class="alert alert-success" *ngIf="success">
                  ✅ {{ success }}
                </div>

                <div class="alert alert-danger" *ngIf="error">
                  ❌ {{ error }}
                </div>

                <button 
                  type="submit" 
                  class="btn btn-primary w-100"
                  [disabled]="loading || setupForm.invalid">
                  <span *ngIf="!loading">Crear Administrador</span>
                  <span *ngIf="loading">Creando...</span>
                </button>
              </form>

              <hr>

              <div class="alert alert-warning">
                <strong>Después de crear el admin:</strong>
                <ol class="mb-0">
                  <li>Elimina este archivo</li>
                  <li>Elimina la ruta en app.routes.ts</li>
                  <li>Ve a /login para acceder</li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    code {
      background: #f4f4f4;
      padding: 2px 6px;
      border-radius: 3px;
    }
  `]
})
export class SetupAdmin {
  private fb = inject(FormBuilder);
  private auth = inject(Auth);

  setupForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  loading = false;
  success = '';
  error = '';

  async crearAdmin() {
    if (this.setupForm.invalid) return;

    this.loading = true;
    this.success = '';
    this.error = '';

    try {
      const { email, password } = this.setupForm.value;
      await createUserWithEmailAndPassword(this.auth, email!, password!);
      
      this.success = `Usuario administrador creado: ${email}. Ahora puedes ir a /login`;
      this.setupForm.reset();
      
    } catch (error: any) {
      if (error.code === 'auth/email-already-in-use') {
        this.error = 'Este email ya está registrado. Usa /login para acceder.';
      } else {
        this.error = `Error: ${error.message}`;
      }
    } finally {
      this.loading = false;
    }
  }
}
