import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { CurrencyRateService } from "../../service/currency-rate.service";

@Component({
  selector: 'app-converter',
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.scss']
})

export class ExchangeComponent implements OnInit {
  inputFromValue = ''
  inputToValue = ''
  inputFromKey = ''
  inputToKey = ''

  form!: FormGroup;
  exchangeCanBePerformed = false;

  constructor(public currencyService: CurrencyRateService) {
  }

  ngOnInit() {
    this.currencyService.dataLoader.subscribe(data => {
      this.exchangeCanBePerformed = data;
    })

    this.form = new FormGroup({
      currency: new FormGroup({
        exchangeFrom: new FormControl('UAH'),
        exchangeTo: new FormControl('USD'),
        currencyInputFrom: new FormControl('', Validators.required),
        currencyInputTo: new FormControl('', Validators.required)
      })
    })
  }

  exchange() {
    if (this.exchangeCanBePerformed) {
      this.inputFromKey = this.form.get('currency')!.get('exchangeFrom')!.value;
      this.inputToKey = this.form.get('currency')!.get('exchangeTo')!.value;

      const rateFrom: number = this.currencyService.findCurrencyRate(this.inputFromKey);
      const rateTo: number = this.currencyService.findCurrencyRate(this.inputToKey);
      const exchangedValue: number = +(+this.inputFromValue * rateFrom / rateTo).toFixed(2);

      this.inputToValue = exchangedValue.toString();
    } else {
      console.log('No data in Service');
    }
  }

  onExchangeFrom(inputValue: Event) {
    this.inputFromValue = (<HTMLTextAreaElement>inputValue.target).value;
    this.exchange();
  }

  onChangeDirect() {
    let ccA = this.form.get('currency')!.get('exchangeFrom')!.value;
    let ccB = this.form.get('currency')!.get('exchangeTo')!.value;

    this.form.patchValue({
      currency: { exchangeTo: ccA, exchangeFrom: ccB }
    });

    this.exchange();
  }

  onReset() {
    this.inputFromValue = ''
    this.inputToValue = ''
  }
}
