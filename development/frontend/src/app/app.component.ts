import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'frontend';
  userService = inject(UserService);

  constructor() {
    const user = this.userService.getUserFromStorage();

    if (!user) {
      const randomNumber = Math.ceil(Math.random() * 4000 + 1000);
      const randomName = `user_${randomNumber}`;

      this.userService.createUser(randomName).subscribe((user) => {
        console.log('User Created', user);
        this.userService.saveUserToStorage(user);
      });
    }
  }
}
