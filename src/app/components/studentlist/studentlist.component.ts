import { Component } from '@angular/core';
import { UsersDataService } from '../../services/users-data.service';
import { Students } from '../../interfaces/students';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-studentlist',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, DatePipe],
  templateUrl: './studentlist.component.html',
  styleUrl: './studentlist.component.scss'
})
export class StudentlistComponent {
  searchText: string = ''; // Variable to hold the search text
  constructor(private user: UsersDataService){}
  userscount: number = 0
  users: Students[] =[]

  deletUser(id: string | undefined){
    if (id === undefined) {
      console.error('ID is undefined');
      return;
    }
    this.user.deleteUser(id).subscribe(
      () => {
        this.users = this.users.filter(user => user.id !== id);
      }
    );
  }

  ngOnInit(){
    this.user.getallusers().subscribe({
      next: (data: Students[]) => {
        this.userscount = data.length
      }

    })
    this.user.getallusers().subscribe({
      next: (res: Students[]) => {
        this.users = res
      },
      error: (error: Error) => {
        console.log('error fetching users')
      }
    })
  };
  get filteredUsers(): Students[] {
    if (!this.searchText.trim()) {
      return this.users;
    }
    const lowerCaseSearchText = this.searchText.toLowerCase();

    return this.users.filter(student =>
      student.firstName.toLowerCase().includes(lowerCaseSearchText) ||
      student.lastName.toLowerCase().includes(lowerCaseSearchText) ||
      student.addressCity.toLowerCase().includes(lowerCaseSearchText) ||
      student.addressStreet.toLowerCase().includes(lowerCaseSearchText) ||
      student.Email.toLowerCase().includes(lowerCaseSearchText)
    );
  }

}
