import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockList } from '../stock-list/stock-list';
import { StockItem } from '../stock-item/stock-item';
import { Stock } from '../../model/stock';
@Component({
  selector: 'app-create-stock',
  imports: [CommonModule, FormsModule, StockItem],
  standalone: true,
  templateUrl: './create-stock.html',
  styleUrls: ["create-stock.css"],
})
export class CreateStock implements OnInit {
  stockName: string = "";
  stockCode: string = ""
  stockOldCode: string = "";
  stockPrice: number = 0;
  stockPreviousPrice: number = 0;
  stockPriceTouched: boolean = false;
  stockInfoConfim: boolean = false;
  public stockInputNameClass: any;
  public stockInputCodeClass: any;
  public stockInputPriceClass: any;
  public stockInputPreviousPriceClass: any;
  public stockList: Array<Stock> = [];


  constructor() {
      this.stockList.push(new Stock("HDPE là ngon luôn", "HDPE", 100, 80));
    this.stockList.push(new Stock("Alo Vũ à Vũ?", "Tày  ", 150, 120));
    this.stockList.push(new Stock("Thanh Hóa", "3652", 36, 369));  
  }
  ngOnInit(): void {
    this.stockInputPriceClass = {
      "hop-le": true
    }
  }
  updateNameStockClass(): void {
    this.stockInputNameClass = {
      "hop-le": this.stockName != "" && this.stockName != null,
      "khong-hop-le": this.stockName == "" || this.stockName == null
    }
  }
  updateCodeStockClass(): void {
    this.stockInputCodeClass = {
      "khong-hop-le": this.stockCode != this.stockOldCode,
      "" : this.stockCode == this.stockOldCode
    };
  }
  updateOldCodeValue(): void {
    this.stockOldCode = this.stockCode;
     this.stockInputCodeClass = {
      "" : true
     }
  }
  leavePriceInput(): void {
    this.stockInputPriceClass = {
      "khong-hop-le"  : true
    }
  }
  createStock(): void {
    this.stockList.push(new Stock(this.stockName, this.stockCode, this.stockPrice, this.stockPreviousPrice)); 
  }
}
