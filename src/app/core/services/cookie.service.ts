import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CookieService {
  private cookieStore: { [key: string]: string } = {}

  constructor() {
    this.parseCookies();
  }

  public parseCookies(cookies = document.cookie) {
    this.cookieStore = {};

    if(!cookies) {
      return;
    }

    const cookiesArray = cookies.split(';');

    for(const cookie of cookiesArray) {
      const cookieArr = cookie.split('=');
      this.cookieStore[cookieArr[0].trim()] = cookieArr[1];
    }
  }

  get(key: string) {
    this.parseCookies();
    return this.cookieStore[key] || null;
  }

  remove(key: string) {
    document.cookie = `${key} = ; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
  }

  set(key: string, value: string) {
    document.cookie = `${key}=${value}`;
  }
}
