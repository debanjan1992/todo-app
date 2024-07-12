import { Component, ElementRef, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { AccordionModule } from 'primeng/accordion';
import { ListOption } from '../list/types';
import { CommonModule } from '@angular/common';
import { ListsService } from '../../services/lists.service';
import { Task } from './types';
import { TaskComponent } from "./task/task.component";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [CommonModule, TaskComponent, FormsModule, AccordionModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  @Input() selectedList!: ListOption;
  @Input() isDefault!: boolean;

  @ViewChild("newTaskEl", { read: ElementRef }) newTaskEl?: ElementRef;

  tasks: Task[] = [];
  listsService: ListsService = inject(ListsService);
  newTaskMode?: boolean;
  newTaskText = "";

  get incompleteTasks() {
    return this.tasks.filter(t => !t.completed);
  }

  get completeTasks() {
    return this.tasks.filter(t => t.completed);
  }

  fetchTasks(listId: string) {
    if (this.isDefault) {
      switch (listId) {
        case "important": this.listsService.getImportantTasks().then(tasks => this.tasks = tasks);
          break;
        case "all": this.listsService.getAllTasks().then(tasks => this.tasks = tasks);
          break;
      }
    } else {
      this.listsService.getTasksInList(listId).then(tasks => this.tasks = tasks);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['selectedList'].currentValue !== changes['selectedList'].previousValue && changes['selectedList'].currentValue) {
      this.tasks = [];
      this.fetchTasks(changes['selectedList'].currentValue.id);
    }
  }

  updateTaskText(e: any) {
    this.newTaskText = e.target.textContent;
  }

  async onAdd(event: KeyboardEvent) {
    if (event.key !== "Enter" || this.newTaskText.length === 0) return;
    event.preventDefault();
    let newTask: Task;
    if (this.isDefault) {
      switch (this.selectedList.id) {
        case "important":
          newTask = { id: "new", title: this.newTaskText, notes: "", completed: false, important: true, listId: null };
          break;
        default:
          newTask = { id: "new", title: this.newTaskText, notes: "", completed: false, important: false, listId: null };
      }
    } else {
      newTask = { id: "new", title: this.newTaskText, notes: "", completed: false, important: false, listId: this.selectedList.id };
    }
    this.tasks = [newTask, ...this.tasks];
    this.newTaskText = "";
    this.newTaskMode = false;
    await this.listsService.addTask(newTask);
    await this.fetchTasks(this.selectedList.id);

  }

  onBlur() {
    if (this.newTaskText.length !== 0) return;
    this.newTaskMode = false;
  }

  async onTaskUpdate(task: Task) {
    await this.listsService.updateTask(task.id, task);
    await this.fetchTasks(this.selectedList.id);
  }

  async onTaskDelete(task: Task) {
    const index = this.tasks.findIndex(t => t.id === task.id);

    if (index !== -1) {
      this.tasks.splice(index, 1);
      await this.listsService.deleteTask(task.id);
      await this.fetchTasks(this.selectedList.id);
    }
  }
}
