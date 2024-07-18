import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../../../core/services/cookie.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private cookieService: CookieService) { }

  login(userData: any): any {
    this.http.post('/api/auth/token/login/', userData).subscribe((data: any) => {
      this.cookieService.set('token', data.token);
      this.cookieService.set('username', data.username);
      this.cookieService.set('user_id', data.user_id);
    });
  }

  logout() {
    this.cookieService.remove('token');
    this.cookieService.remove('username');
    this.cookieService.remove('user_id');
  }
}
