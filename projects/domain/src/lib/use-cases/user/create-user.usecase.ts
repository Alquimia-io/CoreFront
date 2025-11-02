import { Injectable, Inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../../entities/user.entity';
import { UserModel } from '../../models/user.model';
import { UserPort } from '../../ports/user.port';

/**
 * Caso de uso: Crear usuario
 * Implementa la lógica de negocio para crear un usuario
 */
@Injectable({
  providedIn: 'root'
})
export class CreateUserUseCase {
  constructor(
    @Inject('UserPort') private readonly userPort: UserPort
  ) {}

  /**
   * Ejecuta el caso de uso
   * @param userData Datos del usuario a crear
   * @returns Usuario creado si cumple las validaciones
   */
  execute(userData: Omit<User, 'id'>): Observable<UserModel> {
    // Crear modelo temporal para validación
    const tempModel = new UserModel('temp', userData.name, userData.email);

    // Validar reglas de negocio
    if (!tempModel.isComplete()) {
      return throwError(() => new Error('Los datos del usuario no son válidos'));
    }

    // Si pasa las validaciones, crear el usuario
    return this.userPort.create(userData).pipe(
      map(user => new UserModel(user.id, user.name, user.email)),
      catchError(error => {
        console.error('Error creando usuario:', error);
        return throwError(() => new Error('No se pudo crear el usuario'));
      })
    );
  }
}