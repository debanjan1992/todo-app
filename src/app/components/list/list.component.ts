import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ListOption } from './types';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './list.component.html',
  styleUrl: './list.component.scss'
})
export class ListComponent {
  @Input({ required: true }) options?: ListOption[];
}
