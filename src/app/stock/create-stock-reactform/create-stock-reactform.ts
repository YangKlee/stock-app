import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { StockList } from '../stock-list/stock-list';
import { Stock } from '../../model/stock';
import { StockItem } from "../stock-item/stock-item";



@Component({
  selector: 'app-create-stock-reactform',
  imports: [CommonModule, ReactiveFormsModule, StockList],
  templateUrl: './create-stock-reactform.html',
  styleUrl: './create-stock-reactform.css',
})
export class CreateStockReactform implements OnInit, AfterViewInit{
  isFormOpen: boolean = false;
    // trả về một instance của component StockList
  // biến trỏ tới chính instance thật của StockList đang tồn tại, tức là nó truy cập mọi thuộc tính stocklist đc
  @ViewChild(StockList) child!: StockList;
  createStockForm!: FormGroup;

  constructor(private frmBuilder : FormBuilder)
  {
    this.createForm();
  }
  ngOnInit(): void {
    
  }
  ngAfterViewInit(): void {
    
  }
  createForm()
  {
    this.createStockForm = this.frmBuilder.group(
      {
        stockName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        stockCode: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
        stockPrice: [null, [Validators.required, Validators.min(0)]],
        stockLastPrice: [null, [Validators.required, Validators.min(0)]],
        isConfimmed: [false, null]    
  
      }
    )
  }
  checkTrungLap(stockCode: string): Boolean
  {
    let isTrung : Boolean = false;
    this.child.stockList.forEach(stock => {
      if(stock.code == stockCode)
      {  
        isTrung = true;
      }
    });
    return isTrung;
  }
  createStock()
  {

    if(this.createStockForm.valid)
    {
      
      let newStock : Stock = new Stock("", "", 0 , 0, false);
      newStock.name = this.createStockForm.value.stockName;
      newStock.code = this.createStockForm.value.stockCode;
      newStock.price = this.createStockForm.value.stockPrice;
      newStock.previousPrice = this.createStockForm.value.stockLastPrice;
      if(!this.checkTrungLap(newStock.code))
      {
        this.child.stockList.push(newStock);
        alert("Tạo stock thành công!");
      }
      else
      {
        alert("Trùng rồi má");
      }
    }
    else
    {
      alert("Có trường k hợp lệ!");
    }
  }
}
