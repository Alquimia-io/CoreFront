/**
 * Entidad de dominio: Credenciales
 * Representa las credenciales de autenticación en el dominio
 */
export class Credentials {
  constructor(
    public readonly email: string,
    public readonly password: string
  ) {
    this.validateEmail();
    this.validatePassword();
  }

  private validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('Email inválido');
    }
  }

  private validatePassword(): void {
    if (this.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }

  public isValid(): boolean {
    try {
      this.validateEmail();
      this.validatePassword();
      return true;
    } catch {
      return false;
    }
  }
}