import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, LOCALE_ID, Inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { MatRadioButton, MatRadioGroup } from '@angular/material/radio';
import { formatDate } from '@angular/common';
import { FormControl, FormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-payment-inserter',
  standalone: true,
  imports: [
    MatFormField,
    MatInput,
    MatLabel,
    MatDatepicker,
    MatDatepickerModule,
    MatFormFieldModule,
    MatRadioButton,
    MatRadioGroup,
    MatButton,
    FormsModule
  ],
  templateUrl: './payment-inserter.component.html',
  styleUrl: './payment-inserter.component.scss'
})
export class PaymentInserterComponent {

  amountFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern("^(?:€ *)?(\d(?:[. ,]*\d)*)(?: (?:[eE]uro|€))? *$")
  ]);

  types = [ 'Bar', 'Karte', 'SEPA' ];

  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string, public dialog: MatDialog) 
  {

  }

  description: String = "";
  amount: Number = 0.0;
  date: Date = null;
  type: String = "Cash";


  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  insert()
  {
    if(this.description == "")
    {
      this.openDialog("Beschreibung darf nicht leer sein!");
      return;
    }

    if(this.date == null)
    {
      this.openDialog("Datum darf nicht leer sein!");
      return;
    }

    let data = {
      description: this.description,
      amount: this.amount,
      date: formatDate(this.date, "y-M-d", this.locale),
      type: this.type
    }

    const body = JSON.stringify(data);

    let uri = `http://localhost:3000/addItem`;
    this.http.put(uri, body, this.httpOptions).subscribe(_ => console.log("put: " + body));

  }  

  onRadioChange(event)
  {
    console.log(typeof event);
    this.type = event.value;
  }

  openDialog(message: String)
  {
    this.dialog.open(ErrorDialogComponent, { data: { message: message } });
  }

}
