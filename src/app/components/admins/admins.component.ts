import { Component } from '@angular/core';
import { AdminDataService } from '../../services/admin-data.service';
import { Admins } from '../../interfaces/admins';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-admins',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './admins.component.html',
  styleUrl: './admins.component.scss'
})
export class AdminsComponent {
  searchText: string = ''; // Variable to hold the search text
  constructor(private user: AdminDataService){}
  userscount: number = 0
  users: Admins[] =[]

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
      next: (data: Admins[]) => {
        this.userscount = data.length
      }

    })
    this.user.getallusers().subscribe({
      next: (res: Admins[]) => {
        this.users = res
      },
      error: (error: Error) => {
        console.log('error fetching users')
      }
    })
  };
  get filteredUsers(): Admins[] {
    if (!this.searchText.trim()) {
      return this.users;
    }
    const lowerCaseSearchText = this.searchText.toLowerCase();

    return this.users.filter(student =>
      student.adminEmail.toLowerCase().includes(lowerCaseSearchText)
    );
  }

}


