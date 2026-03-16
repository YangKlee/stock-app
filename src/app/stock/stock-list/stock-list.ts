import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Stock } from '../../model/stock';
import { StockItem } from '../stock-item/stock-item';
import { CreateStockReactform } from '../create-stock-reactform/create-stock-reactform';
@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItem, CreateStockReactform],
  templateUrl: './stock-list.html',
  styleUrls: ['./stock-list.css'],
})  
export class StockList implements OnInit {
  public stockList: Array<Stock> = [];
  constructor() {


  }
  ngOnInit(): void {
    this.stockList.push(new Stock("HDPE là ngon luôn", "HDPE", 100, 80, false));
    this.stockList.push(new Stock("Khô gà", "MIXI", 150, 120, false));
    this.stockList.push(new Stock("Thanh Hóa", "3652", 36, 369, false));
  }
}
