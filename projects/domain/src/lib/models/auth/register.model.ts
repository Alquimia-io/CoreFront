/**
 * Modelo de datos: Register
 * Representa los datos de entrada para el proceso de registro
 */
export class RegisterModel {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly confirmPassword: string,
    public readonly fullName: string,
    public readonly acceptTerms: boolean = false
  ) {}

  public static fromForm(
    email: string,
    password: string,
    confirmPassword: string,
    fullName: string,
    acceptTerms: boolean = false
  ): RegisterModel {
    return new RegisterModel(email, password, confirmPassword, fullName, acceptTerms);
  }

  public toJSON(): Record<string, unknown> {
    return {
      email: this.email,
      password: this.password,
      fullName: this.fullName,
      acceptTerms: this.acceptTerms
    };
  }
}