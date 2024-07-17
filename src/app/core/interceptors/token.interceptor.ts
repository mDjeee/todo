import { HttpInterceptor, HttpInterceptorFn } from '@angular/common/http';
import { CookieService } from '../services/cookie.service';
import { inject } from '@angular/core';

export interface TokenInterceptor {
}

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const token = cookieService.get('token');
  console.log('token', token)
  if(!!token) req = req.clone({ setHeaders: { Authorization: `Token ${token}` } });
  return next(req);
}
