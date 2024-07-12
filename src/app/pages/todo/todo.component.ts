import { Component } from '@angular/core';
import { SidepanelComponent } from "../../components/sidepanel/sidepanel.component";
import { TasksComponent } from "../../components/tasks/tasks.component";
import { ListOption } from '../../components/list/types';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [SidepanelComponent, TasksComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {
  selectedTaskList!: ListOption;
  isDefaultList!: boolean;

  onListItemSelected(e: { option: ListOption, default: boolean }) {
    this.selectedTaskList = e.option;
    this.isDefaultList = e.default;
  }
}
