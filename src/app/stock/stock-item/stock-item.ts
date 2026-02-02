import { Component } from '@angular/core';
import {Stock} from '../../model/stock';
@Component({
  selector: 'app-stock-item',
  imports: [],
  standalone: true,
  templateUrl: './stock-item.html',
  styleUrl: './stock-item.css',
})
export class StockItem {
  stock: Stock = new Stock("HDPE", "HDPE là ngon luôn", 100, 80);
  constructor() {}
  ngOnInit() {}
}
