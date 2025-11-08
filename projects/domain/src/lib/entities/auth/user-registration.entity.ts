/**
 * Entidad de dominio: Registro de Usuario
 * Representa los datos necesarios para registrar un nuevo usuario
 */
export class UserRegistration {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly confirmPassword: string,
    public readonly fullName: string
  ) {
    this.validateEmail();
    this.validatePassword();
    this.validatePasswordConfirmation();
    this.validateFullName();
  }

  private validateEmail(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.email)) {
      throw new Error('Email inválido');
    }
  }

  private validatePassword(): void {
    if (this.password.length < 8) {
      throw new Error('La contraseña debe tener al menos 8 caracteres');
    }

    const hasUpperCase = /[A-Z]/.test(this.password);
    const hasLowerCase = /[a-z]/.test(this.password);
    const hasNumbers = /\d/.test(this.password);

    if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
      throw new Error('La contraseña debe contener mayúsculas, minúsculas y números');
    }
  }

  private validatePasswordConfirmation(): void {
    if (this.password !== this.confirmPassword) {
      throw new Error('Las contraseñas no coinciden');
    }
  }

  private validateFullName(): void {
    if (this.fullName.trim().length < 2) {
      throw new Error('El nombre completo debe tener al menos 2 caracteres');
    }
  }

  public isValid(): boolean {
    try {
      this.validateEmail();
      this.validatePassword();
      this.validatePasswordConfirmation();
      this.validateFullName();
      return true;
    } catch {
      return false;
    }
  }

  public getCredentials(): { email: string; password: string } {
    return {
      email: this.email,
      password: this.password
    };
  }
}