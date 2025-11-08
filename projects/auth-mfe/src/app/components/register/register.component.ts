import { Component, signal, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { RegisterUseCase, RegisterModel } from 'domain';

/**
 * Componente de Register
 * Maneja la interfaz de usuario para el proceso de registro
 * Sigue los principios de Clean Architecture y es standalone
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-container">
      <div class="register-card">
        <h2>Crear Cuenta</h2>

        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" novalidate>
          <div class="form-group">
            <label for="fullName">Nombre Completo</label>
            <input
              id="fullName"
              type="text"
              formControlName="fullName"
              placeholder="Ingrese su nombre completo"
              [class.error]="isFieldInvalid('fullName')"
            />
            @if (isFieldInvalid('fullName')) {
              <span class="error-message">
                @if (registerForm.get('fullName')?.errors?.['required']) {
                  El nombre completo es requerido
                }
                @if (registerForm.get('fullName')?.errors?.['minlength']) {
                  El nombre debe tener al menos 2 caracteres
                }
              </span>
            }
          </div>

          <div class="form-group">
            <label for="email">Email</label>
            <input
              id="email"
              type="email"
              formControlName="email"
              placeholder="Ingrese su email"
              [class.error]="isFieldInvalid('email')"
            />
            @if (isFieldInvalid('email')) {
              <span class="error-message">
                @if (registerForm.get('email')?.errors?.['required']) {
                  El email es requerido
                }
                @if (registerForm.get('email')?.errors?.['email']) {
                  El email no es válido
                }
              </span>
            }
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input
              id="password"
              type="password"
              formControlName="password"
              placeholder="Ingrese su contraseña"
              [class.error]="isFieldInvalid('password')"
            />
            @if (isFieldInvalid('password')) {
              <span class="error-message">
                @if (registerForm.get('password')?.errors?.['required']) {
                  La contraseña es requerida
                }
                @if (registerForm.get('password')?.errors?.['minlength']) {
                  La contraseña debe tener al menos 8 caracteres
                }
                @if (registerForm.get('password')?.errors?.['pattern']) {
                  La contraseña debe contener mayúsculas, minúsculas y números
                }
              </span>
            }
          </div>

          <div class="form-group">
            <label for="confirmPassword">Confirmar Contraseña</label>
            <input
              id="confirmPassword"
              type="password"
              formControlName="confirmPassword"
              placeholder="Confirme su contraseña"
              [class.error]="isFieldInvalid('confirmPassword')"
            />
            @if (isFieldInvalid('confirmPassword')) {
              <span class="error-message">
                @if (registerForm.get('confirmPassword')?.errors?.['required']) {
                  Debe confirmar la contraseña
                }
                @if (registerForm.errors?.['passwordMismatch']) {
                  Las contraseñas no coinciden
                }
              </span>
            }
          </div>

          <div class="form-group checkbox-group">
            <label class="checkbox-label">
              <input
                type="checkbox"
                formControlName="acceptTerms"
              />
              <span class="checkmark"></span>
              Acepto los <a href="javascript:void(0)" target="_blank">términos y condiciones</a>
            </label>
            @if (isFieldInvalid('acceptTerms')) {
              <span class="error-message">
                Debe aceptar los términos y condiciones
              </span>
            }
          </div>

          @if (errorMessage()) {
            <div class="error-banner">
              {{ errorMessage() }}
            </div>
          }

          @if (successMessage()) {
            <div class="success-banner">
              {{ successMessage() }}
            </div>
          }

          <button
            type="submit"
            class="submit-btn"
            [disabled]="isLoading() || registerForm.invalid"
          >
            @if (isLoading()) {
              <span class="spinner"></span>
              Creando cuenta...
            } @else {
              Crear Cuenta
            }
          </button>
        </form>

        <div class="form-footer">
          <p>¿Ya tienes cuenta? <a href="javascript:void(0)" (click)="goToLogin($event)">Inicia sesión aquí</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .register-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      padding: 1rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    }

    .register-card {
      background: white;
      border-radius: 8px;
      padding: 2rem;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 450px;
    }

    h2 {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
      font-weight: 600;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 500;
    }

    input[type="text"],
    input[type="email"],
    input[type="password"] {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #e1e5e9;
      border-radius: 4px;
      font-size: 1rem;
      transition: border-color 0.3s ease;
      box-sizing: border-box;
    }

    input[type="text"]:focus,
    input[type="email"]:focus,
    input[type="password"]:focus {
      outline: none;
      border-color: #667eea;
    }

    input.error {
      border-color: #e74c3c;
    }

    .error-message {
      color: #e74c3c;
      font-size: 0.875rem;
      margin-top: 0.25rem;
      display: block;
    }

    .checkbox-group {
      display: flex;
      align-items: flex-start;
    }

    .checkbox-label {
      display: flex;
      align-items: flex-start;
      cursor: pointer;
      margin: 0;
      line-height: 1.5;
    }

    input[type="checkbox"] {
      margin-right: 0.5rem;
      margin-top: 0.25rem;
    }

    .checkbox-label a {
      color: #667eea;
      text-decoration: none;
    }

    .checkbox-label a:hover {
      text-decoration: underline;
    }

    .submit-btn {
      width: 100%;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 4px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: opacity 0.3s ease;
    }

    .submit-btn:hover:not(:disabled) {
      opacity: 0.9;
    }

    .submit-btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid #ffffff3d;
      border-top: 2px solid #ffffff;
      border-radius: 50%;
      animation: spin 1s linear infinite;
      margin-right: 0.5rem;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .error-banner {
      background: #fee;
      color: #c33;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      border: 1px solid #fcc;
    }

    .success-banner {
      background: #efe;
      color: #363;
      padding: 0.75rem;
      border-radius: 4px;
      margin-bottom: 1rem;
      border: 1px solid #cfc;
    }

    .form-footer {
      text-align: center;
      margin-top: 1.5rem;
    }

    .form-footer p {
      color: #666;
      margin: 0;
    }

    .form-footer a {
      color: #667eea;
      text-decoration: none;
      font-weight: 500;
    }

    .form-footer a:hover {
      text-decoration: underline;
    }
  `]
})
export class RegisterComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly registerUseCase = inject(RegisterUseCase);
  private readonly router = inject(Router);

  // Signals para estado reactivo
  readonly isLoading = signal(false);
  readonly errorMessage = signal('');
  readonly successMessage = signal('');

  // Formulario reactivo con validaciones
  readonly registerForm: FormGroup = this.formBuilder.group({
    fullName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    ]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
  }, {
    validators: this.passwordMatchValidator
  });

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.clearMessages();
      this.isLoading.set(true);

      const formValue = this.registerForm.value;
      const registerData = RegisterModel.fromForm(
        formValue.email,
        formValue.password,
        formValue.confirmPassword,
        formValue.fullName,
        formValue.acceptTerms
      );

      this.registerUseCase.execute(registerData).subscribe({
        next: (user) => {
          this.isLoading.set(false);
          this.successMessage.set(`¡Cuenta creada exitosamente! Bienvenido, ${user.getDisplayName()}!`);
          console.log('Usuario registrado:', user);
        },
        error: (error) => {
          this.isLoading.set(false);
          this.errorMessage.set(error.message || 'Error al crear la cuenta');
        }
      });
    } else {
      this.markFormGroupTouched();
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  goToLogin(event: Event): void {
    event.preventDefault();
    this.router.navigate(['/login']);
  }

  private passwordMatchValidator(form: FormGroup): { [key: string]: boolean } | null {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  private clearMessages(): void {
    this.errorMessage.set('');
    this.successMessage.set('');
  }

  private markFormGroupTouched(): void {
    Object.keys(this.registerForm.controls).forEach(key => {
      const control = this.registerForm.get(key);
      control?.markAsTouched();
    });
  }
}