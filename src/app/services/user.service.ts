import { Injectable } from '@angular/core';
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from '../config/firebase';
import { User } from '../components/user/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUserDetails(userId: string): Promise<User | undefined> {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);

    const data = querySnapshot.docs.map(doc => doc.data());

    if (data.length === 1) {
      return data[0] as User;
    }
    return undefined;
  }
}
