import { Component, EventEmitter, Output } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { ListboxModule } from 'primeng/listbox';
import { DividerModule } from 'primeng/divider';

import { UserComponent } from "../user/user.component";
import { ListComponent } from "../list/list.component";
import { ListOption } from '../list/types';
import { ListsService } from '../../services/lists.service';

@Component({
  selector: 'app-sidepanel',
  standalone: true,
  imports: [UserComponent, InputTextModule, IconFieldModule, InputIconModule, ListboxModule, ListComponent, DividerModule],
  templateUrl: './sidepanel.component.html',
  styleUrl: './sidepanel.component.scss'
})
export class SidepanelComponent {
  @Output() listItemSelected = new EventEmitter<{ option: ListOption, default: boolean }>();
  
  newList = false;
  defaultList?: ListOption[];
  userList?: ListOption[];
  selectedTodoList?: ListOption;

  constructor(private listsService: ListsService) {}

  ngOnInit() {
    this.defaultList = this.listsService.getDefaultLists();

    this.listsService.getUserLists("abc").then(list => {
      this.userList = list;
    })
  }

  addNewList() {
    this.newList = true;
  }

  onDefaultListItemSelected(option: ListOption) {
    this.listItemSelected.emit({ option, default: true });
  }

  onUserListItemSelected(option: ListOption) {
    this.listItemSelected.emit({ option, default: false });
  }
}
