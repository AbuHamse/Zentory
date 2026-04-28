import { trigger, transition, style, animate } from '@angular/animations';

export const crossFadeTrigger = trigger('crossFade', [
  transition(':enter', [
    style({ opacity: 0, filter: 'blur(4px)' }),
    animate('250ms ease-out', style({ opacity: 1, filter: 'blur(0)' }))
  ]),
  transition(':leave', [
    animate('150ms ease-in', style({ opacity: 0 }))
  ])
]);