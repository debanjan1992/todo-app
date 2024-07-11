import { Injectable } from '@angular/core';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../config/firebase';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }

  getDefaultLists() {
    return [
      {
        icon: {
          name: "sun",
          color: "gray"
        },
        label: "My Day"
      },
      {
        icon: {
          name: "star",
          color: "pink"
        }, label: "Important"
      },
      {
        icon: {
          name: "home",
          color: "blue"
        }, label: "Tasks"
      },
    ];
  }

  async getUserLists(userId: string) {
    const q = query(collection(db, "usertasklists"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data()).map(data => ({
      icon: {
        name: "star",
        color: data['color']
      },
      label: data['name']
    }));
  }
}
