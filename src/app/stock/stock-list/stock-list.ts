import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Stock } from '../../model/stock';
import { StockItem } from '../stock-item/stock-item';
import { StockService } from '../../services/stock-service';
@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItem],
  templateUrl: './stock-list.html',
  styleUrls: ['./stock-list.css'],
})  
export class StockList implements OnInit {
  isShowDetialDialog :Boolean = false;
  public stockList: Array<Stock> = [];
  constructor(private stockServices:StockService) {


  }
  ngOnInit(): void {
    this.stockList = this.stockServices.getAllStock()
  }
}
