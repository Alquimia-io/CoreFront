import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map, catchError, throwError } from 'rxjs';
import { AuthPort } from '../../ports/auth/auth.port';
import { Credentials } from '../../entities/auth/credentials.entity';
import { AuthenticatedUser } from '../../entities/auth/authenticated-user.entity';
import { LoginModel } from '../../models/auth/login.model';

/**
 * Caso de uso: Login
 * Implementa la lógica de negocio para el proceso de autenticación
 */
@Injectable({
  providedIn: 'root'
})
export class LoginUseCase {
  constructor(
    @Inject('AuthPort') private readonly authPort: AuthPort
  ) {}

  /**
   * Ejecuta el proceso de login
   * @param loginData - Datos de login del usuario
   * @returns Observable con el usuario autenticado
   */
  execute(loginData: LoginModel): Observable<AuthenticatedUser> {
    try {
      // Crear entidad de credenciales para validar reglas de dominio
      const credentials = new Credentials(loginData.email, loginData.password);

      if (!credentials.isValid()) {
        return throwError(() => new Error('Credenciales inválidas'));
      }

      // Delegar al port la implementación específica
      return this.authPort.login(credentials).pipe(
        map(user => {
          // Validar que el usuario autenticado sea válido según reglas de dominio
          if (!user.isValid()) {
            throw new Error('Usuario autenticado inválido');
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
      if (error.message.includes('401') || error.message.includes('Unauthorized')) {
        return new Error('Credenciales incorrectas');
      }
      if (error.message.includes('403') || error.message.includes('Forbidden')) {
        return new Error('Acceso denegado');
      }
      if (error.message.includes('500') || error.message.includes('Server Error')) {
        return new Error('Error interno del servidor. Intente más tarde');
      }
    }
    return new Error('Error al iniciar sesión. Intente nuevamente');
  }
}