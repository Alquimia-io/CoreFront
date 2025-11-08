/**
 * Modelo de datos: Login
 * Representa los datos de entrada para el proceso de login
 */
export class LoginModel {
  constructor(
    public readonly email: string,
    public readonly password: string,
    public readonly rememberMe: boolean = false
  ) {}

  public static fromCredentials(email: string, password: string, rememberMe: boolean = false): LoginModel {
    return new LoginModel(email, password, rememberMe);
  }

  public toJSON(): Record<string, unknown> {
    return {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe
    };
  }
}