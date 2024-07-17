import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatTabLink, MatTabNav, MatTabNavPanel } from '@angular/material/tabs';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbar,
    MatTabNavPanel,
    MatTabNav,
    MatTabLink,
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  links = ['First', 'Second', 'Third'];
  activeLink = this.links[0];
}
