import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Students } from '../../interfaces/students';
import { UsersDataService } from '../../services/users-data.service';
@Component({
  selector: 'app-student-details',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.scss'
})
export class StudentDetailsComponent {

  student: Students={
    firstName: '',
    lastName: '',
    addressCity:'',
    addressStreet:'',
    addressBuilding:'',
    Email:'',
    password:'',
    birthDate:'',
    id: ''

  }
  studentId!: any;
  constructor(private route: ActivatedRoute, protected service: UsersDataService, private router: Router){}
  ngOnInit(){
    this.studentId = this.route.snapshot.paramMap.get('id');
    console.log(this.studentId)
    this.service.getUserById(this.studentId).subscribe(
      res => {
        console.log(res)
        this.student.firstName = res.firstName
        this.student.lastName = res.lastName
        this.student.addressCity = res.addressCity
        this.student.addressStreet = res.addressStreet
        this.student.addressBuilding = res.addressBuilding
        this.student.Email = res.Email
        this.student.password = res.password
        this.student.id = res.id
        const isoDate = res.birthDate;


// Convert ISO string to Date object
const date = new Date(isoDate);

// Extract year, month, and day in the "yyyy-MM-dd" format
const year = date.getFullYear();
const month = (date.getMonth() + 1).toString().padStart(2, '0');  // Adding 1 as months are zero-based
const day = date.getDate().toString().padStart(2, '0');

// Format the date as yyyy-MM-dd (for input type="date")
this.student.birthDate = `${year}-${month}-${day}`;
     }
    )

  }
  updateData() {
    const dateString = this.student.birthDate;

// Split the date into components (year, month, day)
const [year, month, day] = dateString.split('-');

// Reformat as mm/dd/yyyy
const formattedDate = `${month}/${day}/${year}`;

// Assign the formatted date (mm/dd/yyyy) back to the desired variable
this.student.birthDate = formattedDate;
    var inputdata = {

      firstName: this.student.firstName,
    lastName: this.student.lastName,
    addressCity:this.student.addressCity,
    addressStreet:this.student.addressStreet,
    addressBuilding:this.student.addressBuilding,
    Email:this.student.Email,
    password:this.student.password,
    birthDate:formattedDate,
    id: this.student.id
    }
    this.service.updateUser(this.studentId, inputdata).subscribe(
      {
        next: (res: any)=> {
          console.log(res, 'updatted successfully')
          this.router.navigate(['/students']); // Navigate back to admins page
          alert('student updated successfuly')
        },
        error: (error: Error)=>{
          console.log(error, 'error updating ')
        }
      }
    )
  }


}
