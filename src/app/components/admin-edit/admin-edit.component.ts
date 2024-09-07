import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Students } from '../../interfaces/students';
import { UsersDataService } from '../../services/users-data.service';
import { Admins } from '../../interfaces/admins';
import { AdminDataService } from '../../services/admin-data.service';
@Component({
  selector: 'app-admin-edit',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './admin-edit.component.html',
  styleUrl: './admin-edit.component.scss'
})
export class AdminEditComponent {
  admin: Admins = {
    adminEmail: '',
    password: ''
  };

  adminId!: string | null; // Explicit type definition

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected service: AdminDataService
  ) {}

  ngOnInit() {
    this.adminId = this.route.snapshot.paramMap.get('id'); // Get adminId from route
    console.log(this.adminId);

    // Fetch admin data by ID
    if (this.adminId) {
      this.service.getUserById(this.adminId).subscribe(
        res => {
          console.log(res);

          // Check correct field names from API response
          this.admin.adminEmail = res.adminEmail || ''; // Use correct field name
          this.admin.password = res.password || ''; // Use correct field name
        },
        error => {
          console.log('Error fetching user data', error);
        }
      );
    }
  }

  updateData() {
    // Prepare input data for update
    const inputdata = {
      adminEmail: this.admin.adminEmail, // Use correct field names for update
      password: this.admin.password
    };

    if (this.adminId) {
      this.service.updateUser(this.adminId, inputdata).subscribe({
        next: (res: any) => {
          console.log(res, 'updated successfully');
          this.router.navigate(['/admins']); // Navigate back to admins page
          alert('admin updated successfuly')
        },
        error: (error: Error) => {
          console.log('Error updating user', error);
        }
      });
    }
  }
}
