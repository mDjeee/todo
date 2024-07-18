import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { IUser, UserDto } from '../../../core/interfaces/user.interface';
import { take } from 'rxjs';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

interface IUserStore {
  token: string;
  user_id: number | null;
  username: string;
  loading: boolean;
}

const initialState: IUserStore = {
  token: '',
  user_id: null,
  username: '',
  loading: false,
}

export const UserStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      authService = inject(AuthService),
      userService = inject(UserService),
      router = inject(Router)
      ) => ({
      login(userData: UserDto) {
        patchState(store, { loading: true });
        authService.login(userData)
          .pipe(take(1))
          .subscribe({
            next: async (user: IUser) => {
              patchState(store, { ...user, loading: true });
              userService.setUserData(user);
              router.navigate(['/board']);
            },
            error: () => patchState(store, { loading: false })
          })
      },

      logout() {
        authService.logout();
        patchState(store, { ...initialState })
      },

      setUser(user: IUser) {
        patchState(store, { ...user });
      }
    })
  )
)
