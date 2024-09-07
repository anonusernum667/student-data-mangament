import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Admins } from '../../interfaces/admins';
import { AdminDataService } from '../../services/admin-data.service';
import { Route, Router } from '@angular/router';
@Component({
  selector: 'app-createadmins',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './createadmins.component.html',
  styleUrl: './createadmins.component.scss'
})
export class CreateadminsComponent {
email: string = '';
password: string = ''
id: string =''
constructor(private service: AdminDataService, private router:Router) {}

submitData() {
  const data: Admins = {
    id: this.id,

    password: this.password,
    adminEmail: this.email, // Ensure this matches the interface
  };

  this.service.addUser(data).subscribe({
    next: (student) => {
      console.log('Student added:', student);
      this.router.navigate(['/admins']); // Navigate back to admins page
      alert('admin added successfuly')
    },
    error: (err) => {
      console.error('Error adding student:', err);
    }
  });

  console.log('Data to be sent:', data);
}

}
