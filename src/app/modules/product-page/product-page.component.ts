import { ViewChild, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductPageService } from './service/product-page.service';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css'],
  providers: [ProductPageService],
  animations: [
    trigger('filters', [

      transition('void => *', [
        state('in', style({ transform: 'translateX(0)' })),
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ]),
    trigger('modal', [

      transition('void => *', [
        state('in', style({ transform: 'translateY(0)' })),
        style({ transform: 'translateY(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateY(-100%)' }))
      ])
    ])
  ]
})
export class ProductPageComponent implements OnInit, OnDestroy {

  data: any = { page: 0, limit: 20, category: [], collection: [] };
  loadMore: boolean = true;
  homePageService: any;
  subscribeRoute: any;
  sortingArray = [
    { value: 'Low Price', data: 'PRICE_LOW' },
    { value: 'High Price', data: 'PRICE_HIGH' },
    { value: 'Popularity', data: 'POPULAR_HIGH' },
    { value: 'New', data: 'RECENT_HIGH' }
  ];
  discounts = [{ value: 10, checked: false }, { value: 20, checked: false }, { value: 30, checked: false }, { value: 40, checked: false }, { value: 50, checked: false }, { value: 60, checked: false }, { value: 70, checked: false }, { value: 80, checked: false }, { value: 90, checked: false }, { value: 100, checked: false }];
  minPrice = 0;
  maxPrice = 200000;
  showFilters: boolean = false;
  collections: any[] = [];
  products: any[] = [];
  categories: any[] = [];
  colors: any[] = [];
  sortBy: any;
  total = 0;
  categoryType = [
    { value: 'NORMAL', viewValue: 'Category' },
    { value: 'COMPOSITION', viewValue: 'Composition' },
    { value: 'CRAFT', viewValue: 'Craft' },
    { value: 'WEAVE', viewValue: 'Weave' }
  ];

  routeData = { category: [], collection: [] };

  constructor(
    private location: Location,
    private productPageService: ProductPageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getRouteData();
  }

  getRouteData() {
    const routeData = JSON.parse(window.atob(this.route.snapshot.params.data));
    let data = { ...this.data, ...routeData };
    this.data = { ...data };
    if (data.sort) {
      for (let i = 0; i < this.sortingArray.length; i++) {
        if (this.sortingArray[i].data === data.sort) {
          this.sortBy = this.sortingArray[i]
        }
      }
    }
  }

  ngOnInit() {
    this.getCategories();
    this.getCollections();
    this.getProducts();
  }

  filterCategories(type) {
    return this.categories.filter(x => x.type === type);
  }

  isMobileDevice() {
    return this.productPageService.isMobileDevice();
  }

  getProducts(loadMore = false) {

    if (this.categories.length) {
      let categories = this.categories.filter(x => x.checked).map(x => x._id);
      this.data['category'] = categories.length ? JSON.stringify(categories) : null;
      let collections = this.collections.filter(x => x.checked).map(x => x._id);
      this.data['collection'] = collections.length ? JSON.stringify(collections) : null;
    }
    this.data['minPrice'] = this.minPrice;
    this.data['maxPrice'] = this.maxPrice;
    this.productPageService.getProductList(this.data).
      subscribe((response: any) => {
        console.log(response)
        this.products = loadMore ? this.products.concat(response.data.data) : response.data.data;
        this.total = response.data.total;
      });
  }

  getCategories() {
    this.productPageService.getCategoryList({ page: 0, limit: 50 }).
      subscribe((response: any) => {
        console.log(response)
        response.data.data.forEach(
          (item,index) => {
            item.checked = this.data.category.indexOf(item._id) >= 0;
            item['type'] = index%2==0?'NORMAL':'WEAVE';
          }
        )
        this.categories = response.data.data
      });
  }

  getCollections() {
    this.productPageService.getCollectionList({ page: 0, limit: 50 }).
      subscribe((response: any) => {
        console.log(response, this.data)
        response.data.data.forEach(
          item => {
            item.checked = this.data.collection.indexOf(item._id) >= 0;
          }
        )
        this.collections = response.data.data
      });
  }

  getColors() {
    this.productPageService.getColorList({ page: 0, limit: 50 }).
      subscribe((response: any) => {
        console.log(response, this.data)
        response.data.data.forEach(
          item => {
            item.checked = this.data.color.indexOf(item._id) >= 0;
          }
        )
        this.colors = response.data.data
      });
  }

  changeUrl() {
    this.data.skip = 0;
    let data = window.btoa(JSON.stringify(this.data))
    const url = this
      .router
      .createUrlTree([{ data: data }], { relativeTo: this.route })
      .toString();
    this.location.go(url)
  }


  goToProductDetailPage(id) {

  }




  ngOnDestroy() {

  }
}
