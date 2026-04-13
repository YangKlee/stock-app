import { Component, OnInit } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';
import { Stock } from '../../model/stock';;
import { json } from 'node:stream/consumers';
import { StockService } from '../../services/stock-service';
import { BehaviorSubject, Observable } from 'rxjs';
import { Route, Router, ActivatedRoute} from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-stock-reactform',
  imports: [CommonModule, ReactiveFormsModule, MatButtonModule, MatCheckboxModule, MatSelectModule, MatInputModule
    , MatFormFieldModule, MatCardModule
  ],
  templateUrl: './create-stock-reactform.html',
  styleUrl: './create-stock-reactform.css',
})
export class CreateStockReactform implements OnInit{
  public isFormOpen = new BehaviorSubject<boolean>(false);
  title_form: string = "";
  createStockForm!: FormGroup;
  isModifyMode: Boolean = false;
  modifyStockId: string = "";
  constructor(private frmBuilder : FormBuilder, private stockService:StockService, 
    private router:Router, private route:ActivatedRoute)
  {
    // this.createForm();
  }
  ngOnInit(): void {
 
    this.createForm();
    let tempID = this.route.snapshot.paramMap.get("id");
    if(tempID)
    {
      this.modifyStockId = tempID;
      this.title_form="Modify Stock";
      this.isModifyMode = true;
      this.stockService.getStock(tempID).subscribe(
        e=>{
        this.createStockForm.patchValue({
                stockName: e.name,
                stockCode: e.code,
                stockPrice: e.price,
                stockLastPrice: e.previousPrice,
                stockExchange: e.exchange
        });
      })


    }
    else
    {
      this.isModifyMode = false;
      this.title_form= "Create Stock"
      this.createForm();
    }
    
  }
  openDialog()
  {
    console.log("Open dialog!");
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

  submitForm()
  {
    if(!this.isModifyMode)
    {
      console.log("do create");
      this.createStock()
    }
    else
    {
      console.log("do modify");
      this.modifyStock();
    }
  }
  createStock()
  {
    console.log("create stock click");
    if(this.createStockForm.valid)
    {
      let noti: String = "";
      let newStock : Stock = new Stock(0,"", "", 0 , 0, "", false);
      newStock.name = this.createStockForm.value.stockName;
      newStock.code = this.createStockForm.value.stockCode;
      newStock.price = this.createStockForm.value.stockPrice;
      newStock.previousPrice = this.createStockForm.value.stockLastPrice;
      newStock.exchange = this.createStockForm.value.stockExchange;
      this.stockService.createStock(newStock).subscribe(
        // hàm trả về khi hàm api được chạy thành công, k lỗi
        (result:any)=>{
          console.log("Create complete!");
          //noti = result.msg;
          alert("Tạo stock thành công!");
          this.createStockForm.reset();
          this.router.navigate(["stocklist"]);
          this.stockService.isReloadStockData.next(true);
          
        },
        (err: any)=>{
          console.log("Error ");
          //noti = err.msg;
          alert("Tạo sock thất bại")
        }
      
      )

      //alert(noti);
    }
    else{
      alert("Có trường không hợp lệ!");
    }

  }
  modifyStock()
  {
        if(this.createStockForm.valid)
    {
      let newStock : Stock = new Stock(Date.now(),"", "", 0 , 0, "", false);
      newStock.name = this.createStockForm.value.stockName;
      newStock.code = this.createStockForm.value.stockCode;
      newStock.price = this.createStockForm.value.stockPrice;
      newStock.previousPrice = this.createStockForm.value.stockLastPrice;
      newStock.exchange = this.createStockForm.value.stockExchange;
      //this.stockService.modifyStockCode.subscribe((e: number)=> id = e);
      this.stockService.modifyStock(newStock, this.modifyStockId).subscribe(
        (data: any)=>{
          alert("Sửa stock thành công!");
          this.createStockForm.reset();
          this.stockService.isReloadStockData.next(true);
          this.router.navigate(['stocklist']);
        },
        (data: any)=>{
          alert("Sửa stock thất bại!");
        }
      )
      
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
      this.stockService.modifyStockCode.next(-1);
      
    }
    this.createStockForm.reset();
    
    this.router.navigate(["stocklist"]);
  }
}
