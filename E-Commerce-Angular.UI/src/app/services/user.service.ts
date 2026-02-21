import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/api/login.request';
import { LoginResponse } from '../models/api/login.response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = "/Users"

  constructor(private http:HttpClient) { }

  public GetUsers() : Observable<User[]> {
    return this.http.get<User[]>((environment as any).apiUrl + this.url);
  }

  public AddUser(user: User): Observable<User> {
    return this.http.post<User>(
      (environment as any).apiUrl + this.url,
      user
    );
  }
}