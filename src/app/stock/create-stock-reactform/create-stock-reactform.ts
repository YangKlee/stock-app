import { Component, OnInit } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Stock } from '../../model/stock';
import { console } from 'node:inspector';
import { json } from 'node:stream/consumers';
import { StockService } from '../../services/stock-service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-create-stock-reactform',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create-stock-reactform.html',
  styleUrl: './create-stock-reactform.css',
})
export class CreateStockReactform implements OnInit{
  public isFormOpen = new BehaviorSubject<boolean>(false);
  title_form: string = "";
  createStockForm!: FormGroup;
  isModifyMode: Boolean = false;
  constructor(private frmBuilder : FormBuilder, private stockService:StockService)
  {
    // this.createForm();
  }
  ngOnInit(): void {
    this.stockService.modifyStockCode.subscribe(code =>{
      if(code != "")
      {
        this.title_form="Modify Stock";
        this.isFormOpen.next(true);
        this.isModifyMode = true;
        let stockObj = this.stockService.getStock(code);
        if(stockObj)
          this.createFormForModify(stockObj)
      }
      else
      {
        this.title_form= "Create Stock"
        
      }
    })
  }
  openDialog()
  {
    this.createForm();
    this.isFormOpen.next(true);
  }
  createForm()
  {
    this.createStockForm = this.frmBuilder.group(
      {
        stockName: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        stockCode: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
        stockPrice: [null, [Validators.required, Validators.min(0)]],
        stockLastPrice: [null, [Validators.required, Validators.min(0)]],
        stockExchange: [null, [Validators.required]],
        stockSubmit: ["Create Stock", []],
        isConfimmed: [false, []]    
  
      }
    )
  }
  createFormForModify(stock : Stock){
    this.createStockForm = this.frmBuilder.group(
      {
        stockName: [stock.name, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]],
        stockCode: [stock.code, [Validators.required, Validators.minLength(2), Validators.maxLength(6)]],
        stockPrice: [stock.price, [Validators.required, Validators.min(0)]],
        stockLastPrice: [stock.previousPrice, [Validators.required, Validators.min(0)]],
        stockExchange: [stock.exchange, [Validators.required]],
        stockSubmit: ["Modify Stock", null],
        isConfimmed: [false, null]    
  
      }
    )
  }
  submitForm()
  {
    if(!this.isModifyMode)
    {
      this.createStock()
    }
    else
    {
      this.modifyStock();
    }
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
        this.createStockForm.reset();
        this.isFormOpen.next(false);
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
  modifyStock()
  {
        if(this.createStockForm.valid)
    {
      let newStock : Stock = new Stock("", "", 0 , 0, "");
      newStock.name = this.createStockForm.value.stockName;
      newStock.code = this.createStockForm.value.stockCode;
      newStock.price = this.createStockForm.value.stockPrice;
      newStock.previousPrice = this.createStockForm.value.stockLastPrice;
      newStock.exchange = this.createStockForm.value.stockExchange;
      if(this.stockService.modifyStock(newStock.code,newStock))
      {
        alert("Sửa stock thành công!");
        this.createStockForm.reset();
        this.isFormOpen.next(false);
      }
      else
      {
        alert("Sửa stock không thành công!");
      }
      
    }
    else
    {
      alert("Có trường k hợp lệ!");
    }
  }
  closeDialog()
  {
    this.isFormOpen.next(false)
    if(this.isModifyMode)
    {
      this.stockService.modifyStockCode.next("");
      
    }
    this.createStockForm.reset();
  }
}
