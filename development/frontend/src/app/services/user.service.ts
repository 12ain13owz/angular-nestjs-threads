import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { enviroment } from '../environment';
import { User } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  http = inject(HttpClient);

  localStorageKey = 'threads_user';

  createUser(name: string) {
    return this.http.post<User>(`${enviroment.API_BASE_URL}/users`, {
      name,
    });
  }

  saveUserToStorage(user: User) {
    localStorage.setItem(this.localStorageKey, JSON.stringify(user));
  }

  getUserFromStorage(): User | null {
    const user = localStorage.getItem(this.localStorageKey);
    return user ? JSON.parse(user) : null;
  }
}
