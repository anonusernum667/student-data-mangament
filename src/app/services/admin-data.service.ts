import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Admins } from '../interfaces/admins';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {


  constructor(private http: HttpClient) {}
 apiurl = 'https://66d4a3985b34bcb9ab3f1f84.mockapi.io/students/v1/admins'

 getallusers():Observable<Admins[]>{
  return this.http.get<Admins[]>(this.apiurl)
 }
 getUserById(id: string) {
  return this.http.get<Admins>(`${this.apiurl}/${id}`);
}
updateUser(id: string, updatedUser: Partial<Admins>) {
  return this.http.put<Admins>(`${this.apiurl}/${id}`, updatedUser);
}
deleteUser(id: string) {
  return this.http.delete(`${this.apiurl}/${id}`);
}
addUser(newUser: Admins): Observable<Admins> {
  return this.http.post<Admins>(this.apiurl, newUser);
}}
