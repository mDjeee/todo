import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './core/components/header/header.component';
import { UserStore } from './views/login/store/user.store';
import { UserService } from './views/login/services/user.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'todo';
  userStore = inject(UserStore);
  userService = inject(UserService);

  ngOnInit(): void {
    const user = this.userService.getUserData();
    this.userStore.setUser(user);
  }
}
