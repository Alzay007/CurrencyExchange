import { Component, OnInit } from '@angular/core';
import { CurrencyRateService } from "../../service/currency-rate.service";
import { CurrencyInt } from "../../service/currencyInt.interface";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly currencyCodeArr: String[] = [
    'USD',
    'EUR'
  ]

  currency: CurrencyInt[] = [];

  constructor(private currencyService: CurrencyRateService) { }


  ngOnInit() {
    this.currencyService.dataLoader.subscribe(data => {
      if (data) {
        this.currency = this.currencyService.getSetOfCurrency(this.currencyCodeArr);
      }
    });
  }
}
