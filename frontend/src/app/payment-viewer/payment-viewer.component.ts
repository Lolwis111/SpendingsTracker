import { MatTableModule } from '@angular/material/table';
import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { DatePipe, formatDate, CurrencyPipe } from '@angular/common';
import { LOCALE_ID, Inject } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { MatPaginator, PageEvent } from '@angular/material/paginator';

export interface BankingItem
{
  ID: number,
  Description: string,
  Amount: number,
  PaymentType: string,
  Date: string
}


@Component({
  selector: 'app-payment-viewer',
  standalone: true,
  imports: [
    MatTableModule, 
    MatToolbar,
    MatPaginator,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './payment-viewer.component.html',
  styleUrl: './payment-viewer.component.scss'
})
export class PaymentViewerComponent implements OnInit {

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) 
  {
    this.bankingItems = [];
  }

  bankingItems: BankingItem[] = [];
  bankingItemsDisplay: BankingItem[] = [];
  totalSum: number = 0;

  columnsToDisplay = [ 'description', 'amount', 'paymentType', 'date' ];
  pageSizeOptions = [ 5, 10, 15, 20 ];
  pageSize: number = 10;

  ngOnInit(): void 
  {

  }

  refresh(event: {start:Date, end:Date})
  { 
    console.log(event);
    
    if(event.start == null || event.end == null) 
    {
      return;
    }

    let startStr = formatDate(event.start, "y-M-d", this.locale);
    let endStr = formatDate(event.end, "y-M-d", this.locale);

    let uri = `http://localhost:3000/items/${startStr}/${endStr}`;

    this.http.get<BankingItem[]>(uri).subscribe(resp => {

        this.bankingItems = resp;
        this.bankingItems.map(x => {

          x.Date = new Date(x.Date).toDateString()

        });

        this.totalSum = this.bankingItems.reduce((sum, current) => sum + current.Amount, 0);

        this.bankingItemsDisplay = this.bankingItems.slice(0, this.pageSize);

    });
  }

  updateList(event: PageEvent)
  {
    this.pageSize = event.pageSize;
    let start = event.pageIndex * event.pageSize;
    let end = start + event.pageSize;

    this.bankingItemsDisplay = this.bankingItems.slice(start, end);
  }
}
