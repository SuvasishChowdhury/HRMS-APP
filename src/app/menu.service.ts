import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuItemSource = new BehaviorSubject<any[]>([]);
  menuItems$ = this.menuItemSource.asObservable();

  updateMenuItems(menuItem : any[]): void{
    this.menuItemSource.next(menuItem);
  }
}
