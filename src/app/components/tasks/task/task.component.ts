import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../types';
import { CommonModule } from '@angular/common';
import { ContextMenuModule } from 'primeng/contextmenu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule, ContextMenuModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.scss'
})
export class TaskComponent {
  @Input({ required: true }) task!: Task;
  @Output() onUpdate = new EventEmitter<Task>();
  @Output() onDeleteClicked = new EventEmitter<Task>();

  menuItems: MenuItem[] = [
    { label: "Delete", command: () => this.onDeleteClicked.emit(this.task) }
  ];

  toggleCompleted() {
    if (this.task) {
      this.task.completed = !this.task.completed;
      this.onUpdate.emit(this.task);
    }
  }

  toggleImportant() {
    if (this.task) {
      this.task.important = !this.task.important;
      this.onUpdate.emit(this.task);
    }
  }
}
