import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Students } from '../interfaces/students';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UsersDataService {

  constructor(private http: HttpClient) {}
 apiurl = 'https://66d4a3985b34bcb9ab3f1f84.mockapi.io/students/v1/students'

 getallusers():Observable<Students[]>{
  return this.http.get<Students[]>(this.apiurl)
 }
 getUserById(id: string) {
  return this.http.get<Students>(`${this.apiurl}/${id}`);
}
updateUser(id: string, updatedUser: Partial<Students>) {
  return this.http.put<Students>(`${this.apiurl}/${id}`, updatedUser);
}
deleteUser(id: string) {
  return this.http.delete(`${this.apiurl}/${id}`);
}
addUser(newUser: Students): Observable<Students> {
  return this.http.post<Students>(this.apiurl, newUser);
}
}
