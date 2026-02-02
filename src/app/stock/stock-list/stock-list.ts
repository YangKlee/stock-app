import { Component } from '@angular/core';
import { Stock } from '../../model/stock';
import { NgForOf } from "../../../../node_modules/@angular/common/types/_common_module-chunk";
import { StockItem } from '../stock-item/stock-item';
@Component({
  selector: 'app-stock-list',
  imports: [NgForOf, StockItem],
  templateUrl: './stock-list.html',
  styleUrl: './stock-list.css',
})  
export class StockList {
  public stockList: Array<Stock> = [];
  constructor() {
    this.stockList.push(new Stock("HDPE là ngon luôn", "HDPE", 100, 80));
    this.stockList.push(new Stock("Alo Vũ à Vũ?", "MIXI", 150, 120));
    this.stockList.push(new Stock("Thanh Hóa", "3652", 36, 369));
  }
}
