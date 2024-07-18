import { Component, inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { UserStore } from '../../views/login/store/user.store';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatTabNavPanel,
    MatTabNav,
    MatTabLink,
    RouterLink,
    NgIf,
    MatIcon
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  userStore = inject(UserStore);
}
