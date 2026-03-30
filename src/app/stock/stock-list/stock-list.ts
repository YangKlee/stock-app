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
  stockSelect: Stock = new Stock("", "", 0, 0, "");
  public stockList: Array<Stock> = [];  
  constructor(private stockServices:StockService) {


  }
  ngOnInit(): void {
    this.stockServices.getAllStock().subscribe(
      (data)=>{
        this.stockList = data;
      }
    )
    // this.stockList = this.stockServices.getAllStock();
    // this.stockServices.selectedStockCode.subscribe(msg =>{
    //   if(msg == "")
    //     this.isShowDetialDialog = false;
    //   else
    //   {

    //     this.isShowDetialDialog = true;
    //     let a = this.stockServices.getStock(msg);
    //     if(a != undefined)
    //       this.stockSelect = a
    //   }
    // })
  }
}
