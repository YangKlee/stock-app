import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Stock } from '../../model/stock';
import { StockItem } from '../stock-item/stock-item';
import { StockService } from '../../services/stock-service';
import { DetailsStock } from '../details-stock/details-stock';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-stock-list',
  imports: [RouterOutlet,CommonModule, StockItem, DetailsStock, FormsModule],
  templateUrl: './stock-list.html',
  styleUrls: ['./stock-list.css'],
})  
export class StockList implements OnInit {
  isShowDetialDialog :Boolean = false;
  searchKeyword: String = "";
  stockSelect: Stock = new Stock(0,"", "", 0, 0, "");
  public stockList!: Observable<Stock[]>
  constructor(private stockServices:StockService) {
    //this.stockList.push(new Stock(0,"", "", 0, 0, ""));

  }
  getStock()
  {
    this.stockList = this.stockServices.getAllStock();
  }
  ngOnInit(): void {
    this.getStock();
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
      this.stockList = this.stockServices.getAllStock();
    }
    else
    {
      // this.stockServices.searchStock(this.searchKeyword).subscribe((data: Stock[])=>
      // {
      //   //this.stockList = data;
      // }
      // )
      this.stockList = this.stockList.pipe(
        map(list => 
          list.filter(e =>
            e.name.toLowerCase().includes(this.searchKeyword.toLowerCase()) ||
            e.code.toLowerCase().includes(this.searchKeyword.toLowerCase())
          )
        )
      );
    }
    //console.log(this.searchKeyword);
  } 
}
