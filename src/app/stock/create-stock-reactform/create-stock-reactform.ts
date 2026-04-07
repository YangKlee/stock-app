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
  modifyStockId: string = "";
  constructor(private frmBuilder : FormBuilder, private stockService:StockService, 
    private router:Router, private route:ActivatedRoute)
  {
    // this.createForm();
  }
  ngOnInit(): void {
    // this.stockService.modifyStockCode.subscribe(code =>{
    //   if(code != -1)
    //   {
    //     this.title_form="Modify Stock";
    //     this.isFormOpen.next(true);
    //     this.isModifyMode = true;
    //     this.stockService.getStock(code.toString()).subscribe((data: Stock)=>{
    //       this.createFormForModify(data)
    //     })
    //   }
    //   else
    //   {
    //     this.isModifyMode = false;
    //     this.title_form= "Create Stock"
        
    //   }
    // })
    // // lười xíu fix sau
    let tempID = this.route.snapshot.paramMap.get("id");
    if(tempID)
    {
      this.modifyStockId = tempID;
      this.title_form="Modify Stock";
      this.isModifyMode = true;
      let stockEdit = new Stock(0, "", "", 0, 0, "");
      
      this.createFormForModify(this.stockService.getStock(this.modifyStockId  ));
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
  createFormForModify(stockOf : Observable<Stock>){
    stockOf.subscribe(stock=>{
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
    })
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
      let newStock : Stock = new Stock(0,"", "", 0 , 0, "");
      newStock.name = this.createStockForm.value.stockName;
      newStock.code = this.createStockForm.value.stockCode;
      newStock.price = this.createStockForm.value.stockPrice;
      newStock.previousPrice = this.createStockForm.value.stockLastPrice;
      newStock.exchange = this.createStockForm.value.stockExchange;
      this.stockService.createStock(newStock).subscribe(
        // hàm trả về khi hàm api được chạy thành công, k lỗi
        (result:any)=>{
          console.log("Create complete!");
          noti = result.msg;
          this.createStockForm.reset();
          this.router.navigate(["stocklist"]);
          this.stockService.isReloadStockData.next(true);
          
        },
        (err: any)=>{
          console.log("Error ");
          noti = err.msg;
        }
      
      )

      alert(noti);
    }
    else{
      alert("Có trường không hợp lệ!");
    }

  }
  modifyStock()
  {
        if(this.createStockForm.valid)
    {
      let newStock : Stock = new Stock(Date.now(),"", "", 0 , 0, "");
      newStock.name = this.createStockForm.value.stockName;
      newStock.code = this.createStockForm.value.stockCode;
      newStock.price = this.createStockForm.value.stockPrice;
      newStock.previousPrice = this.createStockForm.value.stockLastPrice;
      newStock.exchange = this.createStockForm.value.stockExchange;
      //this.stockService.modifyStockCode.subscribe((e: number)=> id = e);
      this.stockService.modifyStock(newStock, this.modifyStockId).subscribe(
        (data: any)=>{
          alert(data.msg);
          this.createStockForm.reset();
          this.stockService.isReloadStockData.next(true);
          this.router.navigate(['stocklist']);
        },
        (data: any)=>{
          alert(data.msg);
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
