import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemsService, Item } from './items.service';

@Component({
  selector: 'app-items',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h1>Items</h1>

    <form (ngSubmit)="add()">
      <input [(ngModel)]="newName" name="name" placeholder="New item..." required />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li *ngFor="let it of items()">
        <label>
          <input type="checkbox" [(ngModel)]="it.done" name="done-{{it.id}}" (change)="save(it)" />
          <span [style.textDecoration]="it.done ? 'line-through': 'none'">{{ it.name }}</span>
        </label>
        <button (click)="del(it)">✕</button>
      </li>
    </ul>
  `
})
export class ItemsComponent {
  items = signal<Item[]>([]);
  newName = '';

  constructor(private api: ItemsService) {
    this.load();
  }

  load() {
    this.api.list().subscribe(list => this.items.set(list));
  }

  add() {
    const trimmed = this.newName.trim();
    if (!trimmed) return;
    this.api.create({ name: trimmed, done: false }).subscribe(() => {
      this.newName = '';
      this.load();
    });
  }

  save(it: Item) {
    this.api.update(it).subscribe(() => this.load());
  }

  del(it: Item) {
    if (!it.id) return;
    this.api.remove(it.id).subscribe(() => this.load());
  }
}
