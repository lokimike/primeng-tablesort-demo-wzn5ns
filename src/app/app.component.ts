import { Component, ChangeDetectorRef, ngOnInit } from "@angular/core";
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

  branchType;
  selectedType;
  constructor(
    private productService: ProductService,
    private http: HttpClient,
    private cd: ChangeDetectorRef
  ) {
    this.branchType = [
      { name: "Branch", code: "branch" },
      { name: "Location", code: "location" }
    ];
  }

  ngOnInit() {
    this.http
      .get<any>("assets/products-small.json")
      .toPromise()
      .then(res => <any>res.branch)
      .then(data => {
        this.products1 = data;
      });
  }

  OnDropChange(option) {
    if (option == "location") {
      this.http
        .get<any>("assets/products-small.json")
        .toPromise()
        .then(res => <any>res.location)
        .then(data => {
          this.products1 = data;
        });
    } else {
      this.http
        .get<any>("assets/products-small.json")
        .toPromise()
        .then(res => <any>res.branch)
        .then(data => {
          this.products1 = data;
        });
    }
  }
}
