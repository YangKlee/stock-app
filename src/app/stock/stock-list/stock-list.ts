import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Stock } from '../../model/stock';
import { StockItem } from '../stock-item/stock-item';
import { StockService } from '../../services/stock-service';
import { DetailsStock } from '../details-stock/details-stock';
@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItem, DetailsStock],
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
    this.stockServices.selectedStockCode.subscribe(msg =>{
      if(msg == "")
      {
                this.isShowDetialDialog = false;
        this.stockSelect = new Stock("", "", 0, 0, "");
      }
      else
      {
        let a = this.stockServices.getStock(msg).subscribe((data:Stock)=>{
          this.stockSelect = data;
          this.isShowDetialDialog = true;
          console.log(this.stockSelect);
        })
      }
    })
  }
  
}
