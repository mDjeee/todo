import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../../../core/services/cookie.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    ) { }

  login(userData: any): any {
    this.http.post('/api/auth/token/login/', userData).subscribe((data: any) => {
      this.cookieService.set('token', data.token);
      this.cookieService.set('username', data.username);
      this.cookieService.set('user_id', data.user_id);
      this.router.navigate(['/board']);
    });
  }

  logout() {
    this.cookieService.remove('token');
    this.cookieService.remove('username');
    this.cookieService.remove('user_id');
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !!token;
  }
}
