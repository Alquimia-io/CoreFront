import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfrastructureModule } from 'infrastructure';

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    InfrastructureModule.forRoot()
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ]
})
export class AppModule { }
