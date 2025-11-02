/**
 * Modelo de dominio para User
 * Contiene la lógica de negocio relacionada con el usuario
 */
export class UserModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly email: string
  ) {}

  /**
   * Validación de email según reglas de negocio
   */
  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  /**
   * Validación de nombre según reglas de negocio
   */
  isValidName(): boolean {
    return this.name.length >= 2 && this.name.length <= 100;
  }

  /**
   * Método de dominio para verificar si el usuario está completo
   */
  isComplete(): boolean {
    return this.isValidEmail() && this.isValidName();
  }
}