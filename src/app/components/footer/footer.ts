import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

import { NavItem } from '../../interfaces/nav-item';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class FooterComponent {
  @Input() links: NavItem[] = [];

  @Input() copyright =
    '© 2026 Umami Foods. Projeto acadêmico desenvolvido em Angular.';
}