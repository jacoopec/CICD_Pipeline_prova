import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Item { id?: number; name: string; done: boolean; }

@Injectable({ providedIn: 'root' })
export class ItemsService {
  private http = inject(HttpClient);
  private base = '/api/items';

  list(): Observable<Item[]> { return this.http.get<Item[]>(this.base); }
  create(item: Item): Observable<Item> { return this.http.post<Item>(this.base, item); }
  update(item: Item): Observable<Item> { return this.http.put<Item>(`${this.base}/${item.id}`, item); }
  remove(id: number) { return this.http.delete(`${this.base}/${id}`); }
}
