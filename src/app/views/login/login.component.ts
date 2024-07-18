import { Component, inject } from '@angular/core';
import { MatError, MatFormField, MatHint, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import {
  FormControl,
  FormGroup,
  FormGroupDirective, NgForm,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatTooltip } from '@angular/material/tooltip';
import { AuthService } from './services/auth.service';
import { UserStore } from './store/user.store';
import { UserDto } from '../../core/interfaces/user.interface';
import { MatProgressBar } from '@angular/material/progress-bar';
import { NgIf } from '@angular/common';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    ReactiveFormsModule,
    MatButtonModule,
    MatError,
    MatHint,
    MatTooltip,
    MatProgressBar,
    NgIf
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  userStore = inject(UserStore);
  constructor(
    private authService: AuthService
  ) {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)])
  })

  matcher = new MyErrorStateMatcher();

  login() {
    if(this.loginForm.valid) {
      const userData = this.loginForm.getRawValue() as UserDto;
      this.userStore.login(userData);
    }
  }
}
