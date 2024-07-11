import { Component } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { UserService } from '../../services/user.service';
import { User } from './types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [AvatarModule, AvatarGroupModule, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user?: User;
  constructor(private userService: UserService) {

  }

  ngOnInit() {
    this.userService.getUserDetails("xyz").then(user => this.user = user);
  }
}
