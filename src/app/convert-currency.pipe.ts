import { Pipe, PipeTransform } from "@angular/core";
import { DecimalPipe } from "@angular/common";

@Pipe({ name: "convertCurrency" })
export class ConvertCurrencyPipe implements PipeTransform {
  constructor(private decimalPipe: DecimalPipe) {}
  transform(value: any, digits?: any): any {
    return this.decimalPipe.transform(value / 1000000, digits);
  }
}
