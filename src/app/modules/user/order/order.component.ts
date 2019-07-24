import { Component, OnInit } from '@angular/core';
import { OrderService } from './service/order.service';
@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers:[OrderService]
})
export class OrderComponent implements OnInit {

  orders:any[] = [];
  page = -1;
  limit = 10;
  loadMore:boolean = false;
  message:string = '';

  constructor(
    private _orderService:OrderService
  ) { }

  ngOnInit() 
  {
    this.getOrders();
  }
  isMobileDevice()
  {
    return this._orderService.isMobileDevice();
  }
  paymentMethod(order:any)
  {
   
    
  }
  getOrders()
  {
    ++this.page;
    this._orderService.getOrders({page:this.page,limit:this.limit})
    .subscribe(
      (response:any) => {
        console.log(response);
        this.orders = this.orders.concat(response.data.data);
      }
    )
  }

  ngOnDestroy()
  {
    
  }
}
