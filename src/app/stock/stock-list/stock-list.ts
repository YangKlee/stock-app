import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Stock } from '../../model/stock';
import { StockItem } from '../stock-item/stock-item';
@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItem],
  templateUrl: './stock-list.html',
  styleUrls: ['./stock-list.css'],
})  
export class StockList {
  @Input() public stockList: Array<Stock> = [];
  constructor() {
    this.stockList.push(new Stock("HDPE là ngon luôn", "HDPE", 100, 80));
    this.stockList.push(new Stock("Alo Vũ à Vũ?", "Tày  ", 150, 120));
    this.stockList.push(new Stock("Thanh Hóa", "3652", 36, 369));
  }
}
