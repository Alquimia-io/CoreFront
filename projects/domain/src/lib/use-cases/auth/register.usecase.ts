import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AuthPort } from '../../ports/auth/auth.port';
import { UserRegistration } from '../../entities/auth/user-registration.entity';
import { AuthenticatedUser } from '../../entities/auth/authenticated-user.entity';
import { RegisterModel } from '../../models/auth/register.model';

/**
 * Caso de uso: Register
 * Implementa la lógica de negocio para el proceso de registro de usuarios
 */
@Injectable({
  providedIn: 'root'
})
export class RegisterUseCase {
  constructor(
    @Inject('AuthPort') private readonly authPort: AuthPort
  ) {}

  /**
   * Ejecuta el proceso de registro
   * @param registerData - Datos de registro del usuario
   * @returns Observable con el usuario autenticado
   */
  execute(registerData: RegisterModel): Observable<AuthenticatedUser> {
    try {
      // Validar términos y condiciones
      if (!registerData.acceptTerms) {
        return throwError(() => new Error('Debe aceptar los términos y condiciones'));
      }

      // Crear entidad de registro para validar reglas de dominio
      const userRegistration = new UserRegistration(
        registerData.email,
        registerData.password,
        registerData.confirmPassword,
        registerData.fullName
      );

      if (!userRegistration.isValid()) {
        return throwError(() => new Error('Datos de registro inválidos'));
      }

      // Delegar al port la implementación específica
      return this.authPort.register(userRegistration).pipe(
        map(user => {
          // Validar que el usuario registrado sea válido según reglas de dominio
          if (!user.isValid()) {
            throw new Error('Usuario registrado inválido');
          }
          return user;
        }),
        catchError(error => {
          // Transformar errores técnicos en errores de dominio
          const domainError = this.mapToDomainError(error);
          return throwError(() => domainError);
        })
      );
    } catch (error) {
      return throwError(() => error);
    }
  }

  private mapToDomainError(error: unknown): Error {
    if (error instanceof Error) {
      // Mapear errores comunes a mensajes de dominio
      if (error.message.includes('409') || error.message.includes('Conflict')) {
        return new Error('El email ya está registrado');
      }
      if (error.message.includes('400') || error.message.includes('Bad Request')) {
        return new Error('Datos de registro inválidos');
      }
      if (error.message.includes('500') || error.message.includes('Server Error')) {
        return new Error('Error interno del servidor. Intente más tarde');
      }
    }
    return new Error('Error al registrar usuario. Intente nuevamente');
  }
}