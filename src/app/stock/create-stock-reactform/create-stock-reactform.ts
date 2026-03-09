import { Component, OnInit } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validate } from '@angular/forms/signals';


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
    
  }
  ngOnInit(): void {
    this.createForm();
  }
  createForm()
  {
    this.createStockForm = this.frmBuilder.group(
      {
        stockName: [null, Validators.required, Validators.minLength(6), Validators.maxLength(10)],
        stockCode: [null, Validators.required, Validators.minLength(3), Validators.maxLength(6)],
        stockPrice: [null, Validators.required],
        stockLastPrice: [null, Validators.required],
        isConfimmed: [false, null]    
  
      }
    )
  };
}
