import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  logout() {
    this.authService.logout().subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error('Erro de logout:', error.error.message);
      }
    );
  }
}
