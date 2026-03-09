import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateStockReactform } from './create-stock-reactform';

describe('CreateStockReactform', () => {
  let component: CreateStockReactform;
  let fixture: ComponentFixture<CreateStockReactform>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateStockReactform]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateStockReactform);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
