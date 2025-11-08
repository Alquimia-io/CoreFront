import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfrastructureModule } from 'infrastructure';
import { AppComponent } from './app/app';
import { appRoutes } from './app/app-routing-module';

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      InfrastructureModule.forRoot()
    ),
    provideRouter(appRoutes)
  ]
}).catch(err => console.error(err));
