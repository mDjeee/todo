import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserStore } from '../../views/login/store/user.store';
import { catchError, throwError } from 'rxjs';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const userStore = inject(UserStore);
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((err: any) => {
      const message = err?.error?.message || 'Something went wrong';
      if(err.status === 401) {
        userStore.logout();
      }
      snackBar.open(
        message,
        'Close',
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'top'
        },
      );
      return throwError(() => err);
    })
  );
}
