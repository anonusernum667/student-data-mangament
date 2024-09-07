import { Component } from '@angular/core';
import { AuthService } from '../../services/auth-service.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-account',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent {
  constructor(private authservice: AuthService){}
logout(){
  this.authservice.logout();
  console.log('im clicked')
}
userEmail: string | null = '';
userPassword: string | null = '';
ngOnInit(): void {
  this.userEmail = localStorage.getItem('userEmail');
  this.userPassword = localStorage.getItem('userPassword'); // Consider security implications
}
}
