import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; 

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    
    // In v21, use the empty call. 
    // If the warning persists, it's often a signal to migrate to 
    // native CSS transitions, but for Material components, 
    // this line is still the "bridge" we need for now.
    provideAnimationsAsync(), 

    provideClientHydration(withEventReplay()),
    provideBrowserGlobalErrorListeners(),
  ]
};