import { Injectable } from '@angular/core';
import { collection, query, where, getDocs, setDoc, doc, addDoc, updateDoc, deleteDoc, DocumentReference, DocumentData } from "firebase/firestore";
import { db } from '../config/firebase';
import { Task } from '../components/tasks/types';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ListsService {

  constructor() { }

  getDefaultLists() {
    return [
      {
        id: "myday",
        icon: "sun",
        color: "gray",
        label: "My Day"
      },
      {
        id: "important",
        icon: "star",
        color: "pink",
        label: "Important"
      },
      {
        id: "all",
        icon: "home",
        color: "crimson",
        label: "Tasks"
      }
    ];
  }

  async getUserLists(userId: string) {
    const q = query(collection(db, "usertasklists"), where("userId", "==", userId));

    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => doc.data()).map(data => ({
      id: data["id"],
      color: data["color"],
      label: data['name']
    }));
  }

  async getTasksInList(listId: string): Promise<Task[]> {
    const q = query(collection(db, "tasks"), where("listId", "==", listId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((data: any) => {

      return {
        id: data["id"],
        title: data["title"],
        completed: data['completed'],
        important: data['important'],
        listId: data['listId'],
        notes: data['notes'],
      };
    });
  }

  async getAllTasks(): Promise<Task[]> {
    const q = query(collection(db, "tasks"));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((data: any) => {

      return {
        id: data["id"],
        title: data["title"],
        completed: data['completed'],
        important: data['important'],
        listId: data['listId'],
        notes: data['notes'],
      };
    });
  }

  async getImportantTasks(): Promise<Task[]> {
    const q = query(collection(db, "tasks"), where("important", "==", true));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })).map((data: any) => {

      return {
        id: data["id"],
        title: data["title"],
        completed: data['completed'],
        important: data['important'],
        listId: data['listId'],
        notes: data['notes'],
      };
    });
  }

  async addTask(task: Task) {
    await addDoc(collection(db, "tasks"), {
      title: task.title,
      notes: task.notes,
      completed: task.completed,
      important: task.important,
      listId: task.listId,
    });
  }

  async updateTask(taskId: string, task: Task) {
    await updateDoc(doc(db, "tasks", taskId), {
      title: task.title,
      notes: task.notes,
      completed: task.completed,
      important: task.important,
      listId: task.listId,
    });
  }

  async deleteTask(taskId: string) {
    await deleteDoc(doc(db, "tasks", taskId));
  }
}
