import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { UserHttpAdapter } from './adapters/user-http.adapter';
import { AuthMockAdapter } from './adapters/auth/auth-mock.adapter';

/**
 * Módulo de Infraestructura
 * Configura los adapters y proveedores de la capa de infraestructura
 * Implementa el principio de inversión de dependencias
 */
@NgModule({
  imports: [
    CommonModule
  ]
})
export class InfrastructureModule {
  /**
   * Configura los providers para la aplicación
   * Mapea los Ports (interfaces) a sus Adapters (implementaciones concretas)
   */
  static forRoot(): ModuleWithProviders<InfrastructureModule> {
    return {
      ngModule: InfrastructureModule,
      providers: [
        // Proveer HttpClient con nueva API
        provideHttpClient(withInterceptorsFromDi()),
        // Mapeo de Ports a Adapters
        {
          provide: 'UserPort',
          useClass: UserHttpAdapter
        },
        {
          provide: 'AuthPort',
          useClass: AuthMockAdapter
        }
        // Aquí se pueden agregar más mappings Port -> Adapter
      ]
    };
  }
}