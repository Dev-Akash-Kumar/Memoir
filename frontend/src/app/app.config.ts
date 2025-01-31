// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura'; // Import Aura theme

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimationsAsync(), // Configure animations
    providePrimeNG({
      theme: { preset: Aura }, // Set PrimeNG theme to Aura
    }),
  ],
};
