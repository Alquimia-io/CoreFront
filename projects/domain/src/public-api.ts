/*
 * Public API Surface of domain
 * Exporta las interfaces, modelos y casos de uso del dominio
 */

// User Entities
export * from './lib/entities/user.entity';

// Auth Entities
export * from './lib/entities/auth/credentials.entity';
export * from './lib/entities/auth/user-registration.entity';
export * from './lib/entities/auth/authenticated-user.entity';

// User Models
export * from './lib/models/user.model';

// Auth Models
export * from './lib/models/auth/login.model';
export * from './lib/models/auth/register.model';

// User Ports
export * from './lib/ports/user.port';

// Auth Ports
export * from './lib/ports/auth/auth.port';

// User Use Cases
export * from './lib/use-cases/user/get-users.usecase';
export * from './lib/use-cases/user/create-user.usecase';

// Auth Use Cases
export * from './lib/use-cases/auth/login.usecase';
export * from './lib/use-cases/auth/register.usecase';