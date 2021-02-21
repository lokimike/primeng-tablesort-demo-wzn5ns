import { Component, ChangeDetectorRef, OnInit } from "@angular/core";
import { ProductService } from "./productservice";
import { Product } from "./product";
import { SortEvent } from "primeng/api";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TotalSum } from "./app.model";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent {
  products1;

  totalData = new TotalSum();
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
        this.totalRowValue(data);
      });
  }

  delete(product) {
    console.log(product.index);
    this.products1.splice(product.index, 1);
    this.totalRowValue(this.products1);
  }

  OnDropChange(option) {
    console.log(option);
    if (option.code == "location") {
      this.http
        .get<any>("assets/products-small.json")
        .toPromise()
        .then(res => <any>res.location)
        .then(data => {
          this.totalRowValue(data);
          this.products1 = data;
        });
    } else {
      this.http
        .get<any>("assets/products-small.json")
        .toPromise()
        .then(res => <any>res.branch)
        .then(data => {
          this.totalRowValue(data);
          this.products1 = data;
        });
    }
  }

  getBranch(product) {
    console.log(product);
    let prodArr = [];
    if (product.type === "city") {
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
          this.totalRowValue(this.products1);
        });
    } else {
      this.http
        .get<any>("assets/products-small.json")
        .toPromise()
        .then(res => <any>res.branch)
        .then(data => {
          this.totalRowValue(data);
          this.products1 = data;
        });
    }
  }

  totalRowValue(datas) {
    this.totalData = new TotalSum();
    datas.forEach(data => {
      this.totalData.totalPra += +data.pra;
      this.totalData.totalPrapercent += +data.prapercent;
      this.totalData.totalCpva += +data.cpva;
      this.totalData.totalCpvapercent += +data.cpvapercent;
      this.totalData.totalcma += +data.cma;
      this.totalData.totalRaa += +data.raa;
      this.totalData.totalMsr += +data.msr;
      this.totalData.totalCdda += +data.cdda;
      if (data.type == "branch") {
        this.totalData.totallocation = "Branch Name";
      } else {
        this.totalData.totallocation = "US";
      }
      console.log(+data.cpva);
    });
    this.cd.detectChanges();
    console.log(this.totalData);
  }
}
