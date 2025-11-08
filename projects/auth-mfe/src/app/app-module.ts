import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfrastructureModule } from 'infrastructure';

import { AppRoutingModule } from './app-routing-module';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InfrastructureModule.forRoot()
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ]
})
export class AppModule { }
