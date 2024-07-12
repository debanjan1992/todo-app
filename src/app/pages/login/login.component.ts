import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FloatLabelModule, FormsModule, CommonModule, ButtonModule, PasswordModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  @ViewChild("loginForm", { read: NgForm }) loginForm?: NgForm;

  constructor(private authService: AuthService) {}

  onFormSubmit() {
    if (this.loginForm?.invalid) {
      return;
    }
    const payload = this.loginForm?.value;
    this.authService.login(payload.email, payload.password);
  }
}
