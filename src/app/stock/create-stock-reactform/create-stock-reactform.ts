import { Component, OnInit } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Stock } from '../../model/stock';
import { console } from 'node:inspector';
import { json } from 'node:stream/consumers';


@Component({
  selector: 'app-create-stock-reactform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactform.html',
  styleUrl: './create-stock-reactform.css',
})
export class CreateStockReactform implements OnInit{
  isFormOpen: boolean = false;

  createStockForm!: FormGroup;

  constructor(private frmBuilder : FormBuilder)
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
        isConfimmed: [false, null]    
  
      }
    )
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
      alert("Tạo stock thành công!");
      
    }
    else
    {
      alert("Có trường k hợp lệ!");
    }
  }
}
