import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ListOption } from './types';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input() addNewList: boolean = false;
  @Input({ required: true }) options?: ListOption[];

  @Output() onNewListAdded = new EventEmitter<string>();
  @Output() onListItemSelected = new EventEmitter<ListOption>();

  newListText = "Untitled text";
  selectedOptionId?: string;

  newListTitleChange(e: any) {
    console.log(e);
  }

  onSelected(option: ListOption) {
    this.selectedOptionId = option.id;
    this.onListItemSelected.emit(option);
  }


}
