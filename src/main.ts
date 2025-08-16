import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { importProvidersFrom } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  ...appConfig, 
  providers: [
    ...(appConfig?.providers || []),
    importProvidersFrom(HttpClientModule),
    provideRouter(routes)
  ]
}).catch((err) => console.error(err));
