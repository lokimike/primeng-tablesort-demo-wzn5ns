import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { ProductService } from "./productservice";
import { DropdownModule } from "primeng/dropdown";
import { TableModule } from "primeng/table";
import { ButtonModule } from "primeng/button";
import { DecimalPipe } from "@angular/common";
import { ConvertCurrencyPipe } from "./convert-currency.pipe";

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TableModule,
    DropdownModule,
    ButtonModule,
    HttpClientModule,
    FormsModule
  ],
  declarations: [AppComponent, ConvertCurrencyPipe],
  bootstrap: [AppComponent],
  providers: [ProductService, DecimalPipe]
})
export class AppModule {}
