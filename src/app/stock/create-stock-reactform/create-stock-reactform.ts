import { Component } from '@angular/core';
import { BlobOptions } from 'node:buffer';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-stock-reactform',
  imports: [CommonModule],
  templateUrl: './create-stock-reactform.html',
  styleUrl: './create-stock-reactform.css',
})
export class CreateStockReactform {
  isFormOpen: boolean = false;
  isConfim: boolean = false;
}
