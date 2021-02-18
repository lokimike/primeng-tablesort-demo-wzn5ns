import { Component } from "@angular/core";
import { ProductService } from "./productservice";
import { Product } from "./product";
import { SortEvent } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  products1;

  products2: Product[];

  products3: Product[];

  constructor(
    private productService: ProductService,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.http
      .get<any>("assets/products-small.json")
      .toPromise()
      .then(res => <any>res.data)
      .then(data => {
        this.products1 = data;
        
      });
  }

  customSort(event: SortEvent) {
    event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null) result = -1;
      else if (value1 != null && value2 == null) result = 1;
      else if (value1 == null && value2 == null) result = 0;
      else if (typeof value1 === "string" && typeof value2 === "string")
        result = value1.localeCompare(value2);
      else result = value1 < value2 ? -1 : value1 > value2 ? 1 : 0;

      return event.order * result;
    });
  }
}
