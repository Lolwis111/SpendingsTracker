import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PaymentViewerComponent } from './payment-viewer/payment-viewer.component';
import { CustomDatepickerComponent } from "./custom-datepicker/custom-datepicker.component";
import { CommonModule } from '@angular/common';
import { PaymentInserterComponent } from "./payment-inserter/payment-inserter.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    PaymentViewerComponent,
    CustomDatepickerComponent,
    CommonModule,
    PaymentInserterComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'payments';

  isLoaded: boolean = false;

  ngOnInit(): void {
      this.isLoaded = true;
  }

}
