import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersDataService } from '../../services/users-data.service';
import { Students } from '../../interfaces/students';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-student',
  standalone: true,
  imports: [CommonModule, FormsModule ],
  templateUrl: './create-student.component.html',
  styleUrl: './create-student.component.scss'
})
export class CreateStudentComponent {
  constructor(private service: UsersDataService, private router:Router) {}

  id: string = '';
  firstName: string = '';
  lastName: string = '';
  addressCity: string = '';
  addressStreet: string = '';
  addressBuilding: string = '';
  password: string = '';
  email: string = ''; // Changed to 'email' for consistency
  birthDate: string = '';

  // Method to handle date change
  onDateChange(event: any) {
    // Retrieve the date value from the input
    const dateValue = event.target.value;

    // Convert the date string to a Date object
    const date = new Date(dateValue);

    // Convert Date object to ISO string and store in variable
    this.birthDate = date.toISOString();
  }

  submitData() {
    const data: Students = {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      addressCity: this.addressCity,
      addressStreet: this.addressStreet,
      addressBuilding: this.addressBuilding,
      password: this.password,
      Email: this.email, // Ensure this matches the interface
      birthDate: this.birthDate,
    };

    this.service.addUser(data).subscribe({
      next: (student) => {
        console.log('Student added:', student);
        this.router.navigate(['/students']); // Navigate back to admins page
      alert('student added successfuly')
      },
      error: (err) => {
        console.error('Error adding student:', err);
      }
    });

    console.log('Data to be sent:', data);
  }
}
