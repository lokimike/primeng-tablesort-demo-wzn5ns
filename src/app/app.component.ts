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

  totalData = {
    totalPra: 0,
    totalPrapercent: 0,
    totalCpva: 0,
    totalCpvapercent: 0,
    totalcma: 0,
    totalRaa: 0,
    totalMsr: 0,
    totalCdda: 0
  };
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
    console.log(product.index);
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
          this.totalRowValue(data);
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
    console.log(product);
    let prodArr = [];
    if (product.location) {
      this.http
        .get<any>("assets/products-small.json")
        .toPromise()
        .then(res => <any>res.branch)
        .then(data => {
          this.products1 = data;
          this.products1.forEach(prod => {
            if (prod.city === product.location) {
              prodArr.push(prod);
            }
          });
          this.products1 = prodArr;
        });
    }
  }

  totalRowValue(datas) {
    datas.forEach(data => {
      this.totalData.totalPra += +data.pra;
      this.totalData.totalPrapercent += +data.prapercent;
      this.totalData.totalCpva += +data.cpva;
      this.totalData.totalCpvapercent += +data.cpvapercent;
      this.totalData.totalcma += +data.cma;
      this.totalData.totalRaa += +data.raa;
      this.totalData.totalMsr += +data.msr;
      this.totalData.totalCdda += +data.cdda;
      console.log(+data.pra);
    });
    console.log(this.totalData);
  }
}
