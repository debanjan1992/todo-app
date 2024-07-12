import { Injectable } from '@angular/core';
import { doc, getDoc } from "firebase/firestore";
import { db } from '../config/firebase';
import { User } from '../components/user/types';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  async getUserDetails(userId: string): Promise<User | undefined> {
    const docRef= doc(db, "users", "CZepaXggEHrcYsk2KUBg");
    const docSnapshot = await getDoc(docRef);

    if (docSnapshot.exists()) {
      return docSnapshot.data() as User;
    }
    return undefined;
  }
}
