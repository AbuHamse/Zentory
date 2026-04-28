import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 
import { provideAnimations } from '@angular/platform-browser/animations';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // In v21, use the empty call. 
    // If the warning persists, it's often a signal to migrate to 
    // native CSS transitions, but for Material components, 
    // this line is still the "bridge" we need for now.
    // provideAnimationsAsync(), 
    provideAnimations(),

    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
  ]
};