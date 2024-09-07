import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { StudentlistComponent } from './components/studentlist/studentlist.component';
import { AdminsComponent } from './components/admins/admins.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './auth.guard';
import { AppComponent } from './app.component';
import { StudentDetailsComponent } from './components/student-details/student-details.component';
import { CreateStudentComponent } from './components/create-student/create-student.component';
import { CreateadminsComponent } from './components/createadmins/createadmins.component';
import { AdminEditComponent } from './components/admin-edit/admin-edit.component';

export const routes: Routes = [
  {path:'', redirectTo:'/students', pathMatch: 'full'},
  {path:'account', component:AccountComponent, canActivate: [authGuard]},
  {path:'students', component:StudentlistComponent, canActivate: [authGuard]},
  {path:'admins',component:AdminsComponent, canActivate: [authGuard]},
  {path:'login', component:LoginComponent},
  {path:'students/:id/edit', component:StudentDetailsComponent, title:'Edit student'},
  {path:'admins/:id/edit', component:AdminEditComponent, title:'Edit admin'},
  {path:'students/create', component:CreateStudentComponent, title:'create student'},
  {path:'admins/create', component:CreateadminsComponent, title:'create admin'},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
