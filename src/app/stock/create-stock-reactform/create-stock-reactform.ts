import { Component, OnInit } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Stock } from '../../model/stock';
import { console } from 'node:inspector';
import { json } from 'node:stream/consumers';
import { StockService } from '../../services/stock-service';

@Component({
  selector: 'app-create-stock-reactform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactform.html',
  styleUrl: './create-stock-reactform.css',
})
export class CreateStockReactform implements OnInit{
  isFormOpen: boolean = false;

  createStockForm!: FormGroup;

  constructor(private frmBuilder : FormBuilder, private stockService:StockService)
  {
    this.createForm();
  }
  ngOnInit(): void {
    
  }
  createForm()
  {
    this.createStockForm = this.frmBuilder.group(
      {
        stockName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(10)]],
        stockCode: [null, [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
        stockPrice: [null, [Validators.required, Validators.min(0)]],
        stockLastPrice: [null, [Validators.required, Validators.min(0)]],
        stockExchange: [null, [Validators.required]],
        isConfimmed: [false, null]    
  
      }
    )
  }
  createStock()
  {

    if(this.createStockForm.valid)
    {
      let newStock : Stock = new Stock("", "", 0 , 0, "");
      newStock.name = this.createStockForm.value.stockName;
      newStock.code = this.createStockForm.value.stockCode;
      newStock.price = this.createStockForm.value.stockPrice;
      newStock.previousPrice = this.createStockForm.value.stockLastPrice;
      newStock.exchange = this.createStockForm.value.stockExchange;
      if(this.stockService.createStock(newStock))
      {
        alert("Tạo stock thành công!");
      }
      else
      {
        alert("Tạo stock không thành công!");
      }
      
    }
    else
    {
      alert("Có trường k hợp lệ!");
    }
  }
}
