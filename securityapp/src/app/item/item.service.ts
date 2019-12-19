import { Injectable } from '@angular/core'

import { Item } from './item'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { Config } from '~/config'

@Injectable({
  providedIn: 'root'
})
export class ItemService {
  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    return this.http
      .get<{ players: Item[] }>(`${Config.apiUrl}/players`)
      .pipe(map(result => result.players))
  }

  getItem(id: number): Observable<Item> {
    return this.http
      .get<{ player: Item }>(`${Config.apiUrl}/players/${id}`)
      .pipe(map(result => result.player))
  }
}
