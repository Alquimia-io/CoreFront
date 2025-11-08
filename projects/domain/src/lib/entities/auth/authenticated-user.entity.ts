/**
 * Entidad de dominio: Usuario Autenticado
 * Representa un usuario autenticado en el sistema
 */
export class AuthenticatedUser {
  constructor(
    public readonly id: string,
    public readonly email: string,
    public readonly fullName: string,
    public readonly token: string,
    public readonly refreshToken: string,
    public readonly expiresAt: Date
  ) {
    this.validateId();
    this.validateEmail();
    this.validateToken();
  }

  private validateId(): void {
    if (!this.id || this.id.trim().length === 0) {
      throw new Error('ID de usuario requerido');
    }
  }

  private validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('Email inválido');
    }
  }

  private validateToken(): void {
    if (!this.token || this.token.trim().length === 0) {
      throw new Error('Token de acceso requerido');
    }
  }

  public isTokenExpired(): boolean {
    return new Date() >= this.expiresAt;
  }

  public getDisplayName(): string {
    return this.fullName || this.email;
  }

  public isValid(): boolean {
    try {
      this.validateId();
      this.validateEmail();
      this.validateToken();
      return !this.isTokenExpired();
    } catch {
      return false;
    }
  }
}