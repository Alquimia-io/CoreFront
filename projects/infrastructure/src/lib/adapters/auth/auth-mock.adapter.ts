import { Injectable } from '@angular/core';
import { Observable, of, throwError, delay, switchMap, map } from 'rxjs';
import { AuthPort, AuthenticatedUser, Credentials, UserRegistration } from 'domain';

/**
 * Adapter Mock para Autenticación
 * Implementa el AuthPort usando datos mock para desarrollo/testing
 * NO usa endpoints reales - simula respuestas del servidor
 */
@Injectable({
  providedIn: 'root'
})
export class AuthMockAdapter extends AuthPort {
  private currentUser: AuthenticatedUser | null = null;

  private static readonly DELAYS = {
    LOGIN: 1000,
    REGISTER: 1500,
    LOGOUT: 500,
    REFRESH_TOKEN: 800
  } as const;

  private static readonly TOKEN_CONFIG = {
    EXPIRY_HOURS: 1,
    RANDOM_STRING_START: 2,
    RANDOM_STRING_END: 11
  } as const;

  // Mock data - usuarios predefinidos para testing
  private readonly mockUsers = [
    {
      id: '1',
      email: 'admin@test.com',
      password: 'Admin123',
      fullName: 'Administrador Test'
    },
    {
      id: '2',
      email: 'user@test.com',
      password: 'User123',
      fullName: 'Usuario Test'
    }
  ];

  login(credentials: Credentials): Observable<AuthenticatedUser> {
    return of(null).pipe(
      delay(AuthMockAdapter.DELAYS.LOGIN), // Simular latencia de red
      switchMap(() => {
        // Buscar usuario en mock data
        const user = this.mockUsers.find(
          u => u.email === credentials.email && u.password === credentials.password
        );

        if (!user) {
          return throwError(() => new Error('Credenciales incorrectas'));
        }

        // Crear usuario autenticado mock
        const authenticatedUser = new AuthenticatedUser(
          user.id,
          user.email,
          user.fullName,
          this.generateMockToken(),
          this.generateMockRefreshToken(),
          new Date(Date.now() + AuthMockAdapter.TOKEN_CONFIG.EXPIRY_HOURS * 60 * 60 * 1000) // Expira en 1 hora
        );

        this.currentUser = authenticatedUser;

        // Guardar en localStorage para persistencia
        localStorage.setItem('currentUser', JSON.stringify({
          id: authenticatedUser.id,
          email: authenticatedUser.email,
          fullName: authenticatedUser.fullName,
          token: authenticatedUser.token,
          refreshToken: authenticatedUser.refreshToken,
          expiresAt: authenticatedUser.expiresAt.toISOString()
        }));

        return of(authenticatedUser);
      })
    );
  }

  register(registration: UserRegistration): Observable<AuthenticatedUser> {
    return of(null).pipe(
      delay(AuthMockAdapter.DELAYS.REGISTER), // Simular latencia de red
      switchMap(() => {
        // Verificar si el email ya existe
        const existingUser = this.mockUsers.find(u => u.email === registration.email);

        if (existingUser) {
          return throwError(() => new Error('El email ya está registrado'));
        }

        // Crear nuevo usuario mock
        const newUser = {
          id: Date.now().toString(),
          email: registration.email,
          password: registration.password,
          fullName: registration.fullName
        };

        // Agregar a mock data
        this.mockUsers.push(newUser);

        // Crear usuario autenticado
        const authenticatedUser = new AuthenticatedUser(
          newUser.id,
          newUser.email,
          newUser.fullName,
          this.generateMockToken(),
          this.generateMockRefreshToken(),
          new Date(Date.now() + AuthMockAdapter.TOKEN_CONFIG.EXPIRY_HOURS * 60 * 60 * 1000)
        );

        this.currentUser = authenticatedUser;

        // Guardar en localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          id: authenticatedUser.id,
          email: authenticatedUser.email,
          fullName: authenticatedUser.fullName,
          token: authenticatedUser.token,
          refreshToken: authenticatedUser.refreshToken,
          expiresAt: authenticatedUser.expiresAt.toISOString()
        }));

        return of(authenticatedUser);
      })
    );
  }

  logout(): Observable<boolean> {
    return of(null).pipe(
      delay(AuthMockAdapter.DELAYS.LOGOUT),
      switchMap(() => {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        return of(true);
      })
    );
  }

  getCurrentUser(): Observable<AuthenticatedUser | null> {
    // Intentar recuperar de localStorage
    const stored = localStorage.getItem('currentUser');
    if (stored) {
      try {
        const userData = JSON.parse(stored);
        const user = new AuthenticatedUser(
          userData.id,
          userData.email,
          userData.fullName,
          userData.token,
          userData.refreshToken,
          new Date(userData.expiresAt)
        );

        if (user.isValid()) {
          this.currentUser = user;
          return of(user);
        }
      } catch {
        localStorage.removeItem('currentUser');
      }
    }

    return of(this.currentUser);
  }

  refreshToken(refreshToken: string): Observable<AuthenticatedUser> {
    return of(null).pipe(
      delay(AuthMockAdapter.DELAYS.REFRESH_TOKEN),
      switchMap(() => {
        if (!this.currentUser) {
          return throwError(() => new Error('No hay sesión activa'));
        }

        // Crear nuevo token
        const refreshedUser = new AuthenticatedUser(
          this.currentUser.id,
          this.currentUser.email,
          this.currentUser.fullName,
          this.generateMockToken(),
          this.generateMockRefreshToken(),
          new Date(Date.now() + AuthMockAdapter.TOKEN_CONFIG.EXPIRY_HOURS * 60 * 60 * 1000)
        );

        this.currentUser = refreshedUser;

        // Actualizar localStorage
        localStorage.setItem('currentUser', JSON.stringify({
          id: refreshedUser.id,
          email: refreshedUser.email,
          fullName: refreshedUser.fullName,
          token: refreshedUser.token,
          refreshToken: refreshedUser.refreshToken,
          expiresAt: refreshedUser.expiresAt.toISOString()
        }));

        return of(refreshedUser);
      })
    );
  }

  isAuthenticated(): Observable<boolean> {
    return this.getCurrentUser().pipe(
      map(user => user !== null && user.isValid())
    );
  }

  private generateMockToken(): string {
    return 'mock_token_' + Math.random().toString(36).substring(AuthMockAdapter.TOKEN_CONFIG.RANDOM_STRING_START, AuthMockAdapter.TOKEN_CONFIG.RANDOM_STRING_END);
  }

  private generateMockRefreshToken(): string {
    return 'mock_refresh_' + Math.random().toString(36).substring(AuthMockAdapter.TOKEN_CONFIG.RANDOM_STRING_START, AuthMockAdapter.TOKEN_CONFIG.RANDOM_STRING_END);
  }
}