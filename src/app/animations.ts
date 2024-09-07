import { trigger, transition, style, animate } from '@angular/animations';

// Define the slide-up animation
export const slideUpAnimation = trigger('slideUpAnimation', [
  transition('* => *', [
    // Initial state: offscreen and invisible
    style({ transform: 'translateY(100%)', opacity: 0 }),
    // Animate to final state: onscreen and visible
    animate('1s ease', style({ transform: 'translateY(0)', opacity: 1 })),
  ]),
  transition(':leave', [
    // Initial state: onscreen and visible
    style({ transform: 'translateY(0)', opacity: 1 }),
    // Animate to final state: offscreen and invisible
    animate('1s ease', style({ transform: 'translateY(100%)', opacity: 0 })),
  ]),
]);  
