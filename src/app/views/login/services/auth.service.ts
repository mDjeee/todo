import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from '../../../core/services/cookie.service';
import { Router } from '@angular/router';
import { UserDto } from '../../../core/interfaces/user.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    private router: Router,
    ) { }

  login(userData: UserDto): any {
    return this.http.post('/api/auth/token/login/', userData);
  }

  logout() {
    this.cookieService.remove('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    const token = this.cookieService.get('token');
    return !!token;
  }
}
