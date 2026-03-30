import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsStock } from './details-stock';

describe('DetailsStock', () => {
  let component: DetailsStock;
  let fixture: ComponentFixture<DetailsStock>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailsStock]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetailsStock);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
