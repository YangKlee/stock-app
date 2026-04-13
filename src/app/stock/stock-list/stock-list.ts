import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { Stock } from '../../model/stock';
import { StockItem } from '../stock-item/stock-item';
import { StockService } from '../../services/stock-service';
import { DetailsStock } from '../details-stock/details-stock';
import { FormsModule } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ChangeDetectorRef } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatButton, MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
@Component({
  selector: 'app-stock-list',
  imports: [RouterOutlet,CommonModule, StockItem,FormsModule, MatTableModule, MatButton, MatIcon, MatIconButton, MatInput],
  templateUrl: './stock-list.html',
  styleUrls: ['./stock-list.css'],
})  
export class StockList implements OnInit {
  isShowDetialDialog :Boolean = false;
  searchKeyword: String = "";
  stockSelect: Stock = new Stock(0,"", "", 0, 0, "", false);
  public stockList!: Observable<Stock[]>
  displayedColumns: string[] = ['code', 'name','price', 'preprice', 'action'];
  constructor(private stockServices:StockService, private cd: ChangeDetectorRef, private router: Router) {
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
        this.cd.detectChanges();
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
   addFavorite(stock: Stock)
  {
    this.stockServices.toggleFavourite(stock);
  }
  deleteStock(stock: Stock)
  {
    this.stockServices.deleteStock(stock.id).subscribe(
      (success: any) =>
      {
        alert("Xóa thành công!");
        //this.router.navigate(["stocklist"]);
        this.stockServices.isReloadStockData.next(true);
      },
      (err: any) =>
      {
        alert("Xóa thất bại!");
      }
    )
    // if(this.stockServices.deleteStock(stock.code))
    //   alert("Xóa stock thành công");
    // else
    //   alert("Xóa stock không thành công");
  }
  viewDetial(stock: Stock)
  {
    this.router.navigate(["/stocklist/chitiet", stock.id]);
  }
  modifyStock(stock: Stock)
  {
    this.router.navigate(["/stocklist/edit", stock.id]);
    
    //this.stockServices.modifyStockCode.next(stock.id);
  }
}
