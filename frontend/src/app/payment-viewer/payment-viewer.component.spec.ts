import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentViewerComponent } from './payment-viewer.component';

describe('PaymentViewerComponent', () => {
  let component: PaymentViewerComponent;
  let fixture: ComponentFixture<PaymentViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
