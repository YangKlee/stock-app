import { Component, Input } from '@angular/core';
import {Stock} from '../../model/stock';
@Component({
  selector: 'app-stock-item',
  imports: [],
  standalone: true,
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
})
export class StockItem {
  constructor() {}
  // nhận stock từ cha là stockList, property đó là có thể được bind từ bên ngoài
  // ! chắc chắn rằng nó không null
  @Input() stock!: Stock;
  addFavorite(stock: Stock)
  {
      if(stock.favourite)
        stock.favourite = false;
      else
        stock.favourite = true;
  }
}
