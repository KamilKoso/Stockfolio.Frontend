import { Component, Input } from '@angular/core';

@Component({
  selector: 'stockfolio-user-avatar',
  templateUrl: './user-avatar.component.html',
  styleUrls: ['./user-avatar.component.scss'],
})
export class UserAvatarComponent {
  @Input() avatarUrl: string = '/assets/images/default_avatar.png';
}
