import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentInserterComponent } from './payment-inserter.component';

describe('PaymentInserterComponent', () => {
  let component: PaymentInserterComponent;
  let fixture: ComponentFixture<PaymentInserterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentInserterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentInserterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
