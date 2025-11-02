import { Injectable, Inject } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../../entities/user.entity';
import { UserModel } from '../../models/user.model';
import { UserPort } from '../../ports/user.port';

/**
 * Caso de uso: Obtener usuarios
 * Implementa la lógica de negocio para obtener usuarios
 * Usa inyección de dependencias de Angular para el principio de inversión de control
 */
@Injectable({
  providedIn: 'root'
})
export class GetUsersUseCase {
  constructor(
    @Inject('UserPort') private readonly userPort: UserPort
  ) {}

  /**
   * Ejecuta el caso de uso
   * @returns Lista de usuarios validados según reglas de negocio
   */
  execute(): Observable<UserModel[]> {
    return this.userPort.getAll().pipe(
      map(users => users.map(user =>
        new UserModel(user.id, user.name, user.email)
      )),
      map(userModels => userModels.filter(user => user.isComplete()))
    );
  }
}