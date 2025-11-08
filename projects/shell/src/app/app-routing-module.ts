import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes, RouterLink } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <div style="padding: 2rem; text-align: center;">
      <h1>Bienvenido al Shell</h1>
      <p>Esta es la página principal del shell</p>
      <nav style="margin-top: 2rem;">
        <a routerLink="/auth/login" style="margin-right: 1rem; padding: 0.5rem 1rem; background: #007bff; color: white; text-decoration: none; border-radius: 4px;">
          Iniciar Sesión
        </a>
        <a routerLink="/auth/register" style="padding: 0.5rem 1rem; background: #28a745; color: white; text-decoration: none; border-radius: 4px;">
          Registrarse
        </a>
      </nav>
    </div>
  `,
  imports: [RouterLink]
})
export class HomeComponent { }

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'auth',
    loadChildren: () =>
      loadRemoteModule('auth-mfe', './AuthModule').then(m => m.AuthModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
