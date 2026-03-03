import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StockList } from '../stock-list/stock-list';

@Component({
  selector: 'app-create-stock',
  imports: [CommonModule, FormsModule, StockList],
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
  public stockInputNameClass: any;
  public stockInputCodeClass: any;
  public stockInputPriceClass: any;
  public stockInputPreviousPriceClass: any;
  constructor() {
    
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
}
