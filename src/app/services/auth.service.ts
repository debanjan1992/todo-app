import { Injectable } from '@angular/core';
import { browserLocalPersistence, getAuth, setPersistence, signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../config/firebase';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private userService: UserService) { }

  async login(email: string, password: string) {
    try {
      const auth = getAuth(app);

      await setPersistence(auth, browserLocalPersistence);
  
      const response = await signInWithEmailAndPassword(auth, email, password);
      await this.userService.getUserDetails(response.user.uid);
      return response;
    } catch (err) {
      return;
    }
  }
}
