import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MatDatepickerModule, MatDatepicker, MatDatepickerInputEvent } from '@angular/material/datepicker';
import { DateAdapter, MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-custom-datepicker',
  standalone: true,
  imports: [
    MatDatepickerModule,
    MatDatepicker,
    MatButton,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIcon
  ],
  templateUrl: './custom-datepicker.component.html',
  styleUrl: './custom-datepicker.component.scss'
})
export class CustomDatepickerComponent implements OnInit {

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.dateAdapter.setLocale('de-DE');
  }

  @Output() onSelection = new EventEmitter<{start: Date, end: Date}>();

  today: Date = new Date();

  startDate: Date = new Date(this.today.getFullYear(), this.today.getMonth(), 1);
  endDate: Date = new Date(this.today.getFullYear(), this.today.getMonth() + 1, 0);

  ngOnInit()
  {
    this.onSelection.emit({start: this.startDate, end: this.endDate});
  }

  startChange(event: MatDatepickerInputEvent<Date>)
  {
    this.startDate = event.value;

    this.onSelection.emit({start: this.startDate, end: this.endDate});
  }

  endChange(event: MatDatepickerInputEvent<Date>)
  {
    this.endDate = event.value;

    this.onSelection.emit({start: this.startDate, end: this.endDate});
  }

  goForward()
  {
    this.startDate = new Date(this.startDate.setMonth(this.startDate.getMonth() + 1));
    this.endDate = new Date(this.endDate.setMonth(this.endDate.getMonth() + 1));

    this.onSelection.emit({start: this.startDate, end: this.endDate});
  }

  goBackward()
  {
    this.startDate = new Date(this.startDate.setMonth(this.startDate.getMonth() - 1));
    this.endDate = new Date(this.endDate.setMonth(this.endDate.getMonth() - 1));

    this.onSelection.emit({start: this.startDate, end: this.endDate});
  }
}
