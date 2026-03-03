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
  @Input() stock!: Stock;
}
