import { Pipe, PipeTransform } from "@angular/core";
import { DecimalPipe } from "@angular/common";

@Pipe({ name: "convertCurrency" })
export class ConvertCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}
  transform(value: any, digits?: any): any {
    if (value <= 999) {
      return value;
    }
    // thousands
    else if (value >= 1000 && value <= 999999) {
      return this.decimalPipe.transform(value / 1000, digits) + "K";
    }
    // millions
    else if (value >= 1000000 && value <= 999999999) {
      return this.decimalPipe.transform(value / 1000000, digits) + "M";
    }
    // billions
    else if (value >= 1000000000 && value <= 999999999999) {
      return this.decimalPipe.transform(value / 1000000000, digits) + "B";
    } else return value;
  }
}
