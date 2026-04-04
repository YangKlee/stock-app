import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Stock } from '../../model/stock';
import { StockItem } from '../stock-item/stock-item';
import { StockService } from '../../services/stock-service';
import { DetailsStock } from '../details-stock/details-stock';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-stock-list',
  imports: [CommonModule, StockItem, DetailsStock, FormsModule],
  templateUrl: './stock-list.html',
  styleUrls: ['./stock-list.css'],
})  
export class StockList implements OnInit {
  isShowDetialDialog :Boolean = false;
  searchKeyword: String = "";
  stockSelect: Stock = new Stock(0,"", "", 0, 0, "");
  public stockList: Array<Stock> = [];  
  constructor(private stockServices:StockService) {


  }
  getStock()
  {
        this.stockServices.getAllStock().subscribe(
      (data)=>{
        this.stockList = data;
      }
    )
  }
  ngOnInit(): void {
    this.getStock();
    // this.stockList = this.stockServices.getAllStock();
    this.stockServices.selectedStockCode.subscribe(msg =>{
      if(msg == -1)
      {
                this.isShowDetialDialog = false;
        this.stockSelect = new Stock(0,"", "", 0, 0, "");
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
    this.stockServices.isReloadStockData.subscribe((data: Boolean)=>{
      if(data == true)
      {
        this.getStock();
        this.stockServices.isReloadStockData.next(false);
      }
    })
  }
  doSearch()
  {
    if(this.searchKeyword == "" || this.searchKeyword==null)
    {
      this.getStock();
    }
    else
    {
      this.stockServices.searchStock(this.searchKeyword).subscribe((data: Stock[])=>
      {
        this.stockList = data;
      }
      )
    }
    //console.log(this.searchKeyword);
  } 
}
