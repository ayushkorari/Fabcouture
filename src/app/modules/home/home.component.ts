import { Component, OnInit } from "@angular/core";
import { HomeService } from "./service/home.service";


@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
  providers: []
})
export class HomeComponent implements OnInit {

  homePageProducts = {
    newArrivals: { products: [], class: "latest", viewText: "LATEST PRODUCTS", border: "#00A3CB", url: window.btoa(JSON.stringify({ sort: "RECENT_HIGH" })) },
    mostPopular: { products: [], class: "popular", viewText: "POPULAR PRODUCTS", border: "#F75D59", url: window.btoa(JSON.stringify({ sort: "POPULAR_HIGH" })) },
    mostDiscounted: { products: [], class: "discount", viewText: "TOP OFFERS", border: "#008080", url: window.btoa(JSON.stringify({ sort: "DISCOUNT" })) },
    recommended: { products: [], class: "recommended", viewText: "RECOMMENDED PRODUCTS", border: "#FE980F", url: window.btoa(JSON.stringify({ sort: "POPULAR_HIGH" })) }
  }
  banners = [];
  slides = [];
  recommendedProducts = [];
  constructor(
    private _homeService: HomeService
  ) { }

  ngOnInit() {
    this.getBannerList();
    this.getHomePageProducts();
  }

  isMobileDevice() {
    return this._homeService.isMobileDevice();
  }
  get headings() {
    return Object.keys(this.homePageProducts);
  }

  getBannerList() {
    this._homeService.getBanners().subscribe(
      (response: any) => {
        console.log(response);
        response.data.forEach(
          item => {
            
            item['url'] = window.btoa(JSON.stringify({
              "category": item.category,
              "collection": item.collection,
              "isDyeable": item.isDyeable
            }));
            if (item.slide) {
              this.slides.push(item);
            } else {
              this.banners.push(item);
            }
          }
        )
      }
    )
  }

  getHomePageProducts() {
    this._homeService.getHomePageProducts({ newArrivals: 5, mostDiscounted: 5, mostPopular: 5 })
      .subscribe(
        (response: any) => {
          if (response) {
            this.homePageProducts.newArrivals.products = response.data.newArrivals;
            this.homePageProducts.mostPopular.products = response.data.mostPopular;
            this.homePageProducts.mostDiscounted.products = response.data.mostDiscounted;
            this.homePageProducts.recommended.products = response.data.newArrivals;
          }
        }
      )
  }
}
