import { Observable } from 'rxjs';
import { User } from '../entities/user.entity';

/**
 * Port (Interface) que define las operaciones disponibles para User
 * Esta es la abstracción que el dominio expone hacia el exterior
 */
export interface UserPort {
  getAll(): Observable<User[]>;
  getById(id: string): Observable<User | null>;
  create(user: Omit<User, 'id'>): Observable<User>;
  update(id: string, user: Partial<User>): Observable<User>;
  delete(id: string): Observable<boolean>;
}