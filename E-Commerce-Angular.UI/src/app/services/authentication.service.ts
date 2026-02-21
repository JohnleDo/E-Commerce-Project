import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../models/api/login.request';
import { LoginResponse } from '../models/api/login.response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = "/Auth"
  private jwtHelper = new JwtHelperService();

  constructor(private http:HttpClient) { }
  
  public UserLogin(loginRequest: LoginRequest): Observable<LoginResponse> {
      var result = this.http.post<LoginResponse>(
        (environment as any).apiUrl + this.url + "/Login",
        loginRequest
      );

      // Store the token in local storage when the login is successful
      result.subscribe(response => {
        if (response.token != null) {
          localStorage.setItem('token', response.token);
        }
      });
      return result;
    }

  public logout(): void {
    localStorage.removeItem('token');
  }

  public isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }
}