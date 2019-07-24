import { Component } from '@angular/core';
import { UtilityService } from './modules/shared/services/utility.service';
import * as AOS from 'aos';
import { fromEvent } from 'rxjs';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { HttpService } from './modules/shared/services/http.service';
import { USER_URL } from './constant/urls';
import { Router } from '@angular/router';
import { LoaderService } from './modules/shared/services/loader.service';
import { FormControl } from '@angular/forms';
const DUMMY_DATA = [
  {
    "_id": "5c82b7d2d9814c18e413e2ef",
    "images": [
      "cat1"
    ],
    "parentId": null,
    "status": "PUBLISHED",
    "name": "cat1",
    "alias": "cat1",
    "description": "cat1",
    "sortOrder": 0,
    "updatedAt": 1552070610141,
    "createdAt": 1552070610141,
    "__v": 0
  },
  {
    "_id": "5c82b827ffb7d4194170b619",
    "images": [
      "cat2"
    ],
    "parentId": "5c82b7d2d9814c18e413e2ef",
    "status": "PUBLISHED",
    "name": "cat2",
    "alias": "cat2",
    "description": "cat2",
    "sortOrder": 0,
    "updatedAt": 1552070695969,
    "createdAt": 1552070695969,
    "__v": 0
  },
  {
    "_id": "5c82ba7c7978e31be2b56d83",
    "images": [
      "cat3"
    ],
    "parentId": "5c82b827ffb7d4194170b619",
    "status": "DELETED",
    "name": "cat3",
    "alias": "cat3",
    "description": "cat3",
    "sortOrder": 0,
    "updatedAt": 1552071292767,
    "createdAt": 1552071292767,
    "__v": 0
  },
  {
    "_id": "5c84b5a798bb213043caf661",
    "images": [
      "https://udown-appfiles.s3.amazonaws.com/2f4b6-1528633116-800.jpg"
    ],
    "parentId": null,
    "status": "UNPUBLISHED",
    "name": "Category 1",
    "alias": "Alias",
    "description": "desc",
    "sortOrder": 0,
    "updatedAt": 1552201127354,
    "createdAt": 1552201127354,
    "__v": 0
  },
  {
    "_id": "5c84b6c298bb213043caf662",
    "images": [
      "https://udown-appfiles.s3.amazonaws.com/2f4b6-1528633116-800.jpg"
    ],
    "parentId": null,
    "status": "PUBLISHED",
    "name": "Category 2",
    "alias": "Alias",
    "description": "Desc",
    "sortOrder": 1,
    "updatedAt": 1552201410941,
    "createdAt": 1552201410941,
    "__v": 0
  },
  {
    "_id": "5c84bcaa98bb213043caf663",
    "images": [
      "https://udown-appfiles.s3.amazonaws.com/2f4b6-1528633116-800.jpg"
    ],
    "parentId": "5c84b5a798bb213043caf661",
    "status": "PUBLISHED",
    "name": "With Parent",
    "alias": "djsdfhjkhjksfh",
    "description": "fsdfsdfsd",
    "sortOrder": 1,
    "updatedAt": 1552202922749,
    "createdAt": 1552202922749,
    "__v": 0
  },
  {
    "_id": "5c84cd1b98bb213043caf664",
    "images": [
      "https://udown-appfiles.s3.amazonaws.com/2f4b6-1528633116-800.jpg",
      "https://udown-appfiles.s3.amazonaws.com/demo.jpg"
    ],
    "parentId": "5c84b6c298bb213043caf662",
    "status": "UNPUBLISHED",
    "name": "child of category 2 updated",
    "alias": "Alias",
    "description": "desc",
    "sortOrder": 1,
    "updatedAt": 1552207131927,
    "createdAt": 1552207131927,
    "__v": 0
  }
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    trigger('dropdown', [

      transition('void => *', [
        state('in', style({ transform: 'translateX(0)' })),
        style({ transform: 'translateX(-100%)' }),
        animate(300)
      ]),
      transition('* => void', [
        animate(300, style({ transform: 'translateX(-100%)' }))
      ])
    ])
  ]
})
export class AppComponent {
  title = 'fabcouture';
  loading = false;
  loggedIn = false;
  goToTopInterval: any;
  categoryList = [];
  userDetail = null;
  totalCartProducts = 0;
  search:FormControl = new FormControl();
  searchResults: any;
  notifications = [];
  page = 1;
  constructor(
    private _utilityService: UtilityService,
    private _http: HttpService,
    private _router: Router,
    private _loader: LoaderService
  ) {
    this.getBadgeCount();
    this.userDetail = this._utilityService.getLocalStorage();
    if (this.userDetail) {
      this.loggedIn = true;
    }
    this.updateCartProducts();
    this.getUserDetail();
    this.getNotifications();
  }
  ngOnInit() {
    this.getCategoryList();
    AOS.init({ duration: 1200 });
    fromEvent(window, "scroll").subscribe(e => {
      this.onScroll();
    });
    fromEvent(window, "load").subscribe(e => {
      AOS.refresh();
    });

    this._loader.loader.subscribe(
      data => {
        setTimeout(() => {
          this.loading = data;
        })
      }
    )
    this.search.valueChanges.subscribe(
      search => {
        if(search&&typeof search === 'string') {
          this._http.get(USER_URL.homeSearch,{search}).subscribe(
            response => {
              this.searchResults = response.data;
            }
          )
        } else {
          this.searchResults = [];
        }
      }
    )
  }
  optionSelected(event) {
    this.search.setValue('');
    this._router.navigate(['product-page',window.btoa(JSON.stringify({[event.option.value.type=='COLLECTION'?'collection':'category']:[event.option.value._id]}))]);
    console.log(event)
  }

  getCategoryList(data = { page: 0, limit: 100 }) {
    this._http.get(USER_URL.categoryList, data).subscribe(
      (response: any) => {
        if (response['statusCode'] === 200) {
          response.data.data.forEach(
            category => {
              category['url'] = window.btoa(JSON.stringify({category:[category._id]}));
            }
          )
          this.categoryList = response.data.data;
        }
      }, error => {

      }
    )
  }

  getNotifications() {
    if(localStorage.getItem('userDetail'))
    this._http.get(USER_URL.notification,{page:this.page,limit:10}).subscribe(
      (response: any) => {
        if (response['statusCode'] === 200) {
          this.notifications = response.data.data;
        }
      }, error => {

      }
    )
  }

  updateCartProducts() {
    this._utilityService.cartUpdate.subscribe(
      data => {
        if (data) {
          if (data.remove) {
            this.totalCartProducts = this.totalCartProducts - data.totalCartProducts;
          } else {
            this.totalCartProducts = data.totalCartProducts;
          }
        }
      }
    )
  }

  getUserDetail() {
    this._utilityService.userDetail.subscribe(
      data => {
        console.log(data);
        if (data) {
          this.userDetail = data;
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
          this.userDetail = null;
        }
      }
    )
  }

  getCategories(id) {
    return this.categoryList.filter(
      category => category.parentId === id
    )
  }

  isMobileDevice() {
    return this._utilityService.isMobileDevice()
  }

  onScroll() {
    if (window.scrollY > 600) {
      document.getElementById("myBtn").style.display = "block";
    } else {
      document.getElementById("myBtn").style.display = "none";
    }
  }

  topFunction() {
    let x;
    this.goToTopInterval = setInterval(() => {
      x = Math.max(window.scrollY - 200, 0);
      window.scrollTo(0, x);
      console.log(x)
      if (x == 0 && this.goToTopInterval) {
        clearInterval(this.goToTopInterval)
      }
    }, 10);
  }

  getBadgeCount() {
    if (this._utilityService.getLocalStorage()) {
      this._http.get(USER_URL.badgeCount)
        .subscribe(
          (response: any) => {
            if (response.statusCode === 200) {
              this.totalCartProducts = response.data.totalCartCount;
            }
          }
        )
    }
  }
  logout() {
    this._http.post(USER_URL.logout, {})
      .subscribe(
        (response: any) => {
          if (response.statusCode === 200) {
            this.totalCartProducts = 0;
            this.page = 1;
            this._utilityService.clearStorage();
            this.loggedIn = false;
            this.userDetail = null;
            this.notifications = [];
            this._router.navigate(['']);
          }
        }
      )
  }
}

