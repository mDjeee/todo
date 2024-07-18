import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../../core/interfaces/user.interface';
import { CookieService } from '../../../core/services/cookie.service';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private router: Router, private cookieService: CookieService) {
  }

  setUserData(user: IUser) {
    this.cookieService.set('token', user.token);
    this.cookieService.set('username', user.username);
    this.cookieService.set('user_id', user.user_id);
  }

  getUserData(): IUser {
    return {
      token: this.cookieService.get('token') ?? '',
      username: this.cookieService.get('username') ?? '',
      user_id: +(this.cookieService.get('user_id') ?? 0)
    }
  }
}
