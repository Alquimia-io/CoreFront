/*
 * Public API Surface of infrastructure
 * Exporta los adapters y módulos de configuración
 */

// Module
export * from './lib/infrastructure.module';

// Adapters (Implementaciones concretas)
export * from './lib/adapters/user-http.adapter';

// Environments
export * from './lib/environments/environment';