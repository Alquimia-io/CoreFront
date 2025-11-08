import { Observable } from 'rxjs';
import { AuthenticatedUser } from '../../entities/auth/authenticated-user.entity';
import { Credentials } from '../../entities/auth/credentials.entity';
import { UserRegistration } from '../../entities/auth/user-registration.entity';

/**
 * Port de Autenticación
 * Define el contrato para las operaciones de autenticación
 * Este port será implementado por adapters específicos (HTTP, LocalStorage, etc.)
 */
export abstract class AuthPort {
  /**
   * Realiza el login de un usuario
   * @param credentials - Credenciales del usuario
   * @returns Observable con el usuario autenticado
   */
  abstract login(credentials: Credentials): Observable<AuthenticatedUser>;

  /**
   * Registra un nuevo usuario
   * @param registration - Datos de registro del usuario
   * @returns Observable con el usuario autenticado
   */
  abstract register(registration: UserRegistration): Observable<AuthenticatedUser>;

  /**
   * Cierra la sesión del usuario actual
   * @returns Observable que indica si el logout fue exitoso
   */
  abstract logout(): Observable<boolean>;

  /**
   * Obtiene el usuario actualmente autenticado
   * @returns Observable con el usuario autenticado o null si no hay sesión
   */
  abstract getCurrentUser(): Observable<AuthenticatedUser | null>;

  /**
   * Refresca el token de autenticación
   * @param refreshToken - Token de refresh
   * @returns Observable con el usuario autenticado actualizado
   */
  abstract refreshToken(refreshToken: string): Observable<AuthenticatedUser>;

  /**
   * Verifica si hay una sesión activa
   * @returns Observable que indica si hay una sesión activa
   */
  abstract isAuthenticated(): Observable<boolean>;
}