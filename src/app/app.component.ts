import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
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

  delete(product) {
    console.log(product);
    this.products1.splice(product.index, 1);
  }

  OnDropChange(option) {
    console.log(option);
    if (option.code == "location") {
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

  getBranch(product) {
    console.log(product.index);
    if (product.index == 0) {
      this.http
        .get<any>("assets/products-small.json")
        .toPromise()
        .then(res => <any>res.branch)
        .then(data => {
          this.products1 = data[0];
        });
    }
  }
}
