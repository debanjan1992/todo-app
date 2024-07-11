import { Component } from '@angular/core';
import { SidepanelComponent } from "../../components/sidepanel/sidepanel.component";

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [SidepanelComponent],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss'
})
export class TodoComponent {

}
