import { Component, HostBinding } from '@angular/core';
import {
  NavigationEnd,
  Router,
  RouterOutlet,
  RouterModule,
  ActivatedRoute,
  ChildrenOutletContexts,
  RouterLink,
} from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { filter } from 'rxjs';
import { CommonModule } from '@angular/common';
import { slideUpAnimation } from './animations';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    NavbarComponent,

    CommonModule,
  RouterModule,
  RouterLink,




  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations: [
    slideUpAnimation
  ],
})
export class AppComponent {
  title = 'students-mangament-system';
  currentRoute: string = '';
  @HostBinding('@.disabled')
  public animationsDisabled = false;

  showNavbar = true;


  constructor(private router: Router, protected route: ActivatedRoute) {}
  outlet!: RouterOutlet;
  // prepareRoute(outlet: RouterOutlet) {
  //   return activatedRouteData?.data;
  // }
  toggleAnimations() {
    this.animationsDisabled = !this.animationsDisabled;
  }
  ngOnInit(): void {
    // Listen for route changes
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Hide navbar on login route
        this.showNavbar = !event.urlAfterRedirects.includes('/login');
      });

  }
}
