/*
 * Public API Surface of domain
 * Exporta las interfaces, modelos y casos de uso del dominio
 */

// Entities
export * from './lib/entities/user.entity';

// Models (Domain Models con lógica de negocio)
export * from './lib/models/user.model';

// Ports (Interfaces/Abstracciones)
export * from './lib/ports/user.port';

// Use Cases
export * from './lib/use-cases/user/get-users.usecase';
export * from './lib/use-cases/user/create-user.usecase';