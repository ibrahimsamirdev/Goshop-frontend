import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderHistoryService } from '../order-history.service';

@Component({
  selector: 'app-order-history-details',
  templateUrl: './order-history-details.component.html',
  styleUrls: ['./order-history-details.component.css']
})
export class OrderHistoryDetailsComponent implements OnInit {
id
order 
productList
errorMessage
  constructor(private route: ActivatedRoute,private orderHistoryservice:OrderHistoryService) { }

  
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
    });
    this.getAllOrderData(this.id);
    console.log(this.id)

    console.log(this.order)
    console.log(this.productList)
  }

  getAllOrderData(id: any) {
    this.orderHistoryservice.getAllOrderData(id).subscribe(data => {
      this.order = data;
      if(this.order == null){
        this.order =[];
      }
      let  list:Number[]=[];
      console.log("order>>>>>>>",this.order)
      let orderDetails = this.order.orderDetails;
      for(let i of orderDetails)
      list.push(i.id)
      console.log( list)
      this.orderHistoryservice.getAllOrderProductData(list).subscribe(data => {
        this.productList = data;
        if(this.productList == null){
          this.productList =[];
        }
     console.log(this.productList)
    },
    (error) => {
      this.errorMessage = error;
    });
    },
    (error) => {
      this.errorMessage = error;
    });


      //   let  list=[];
      //  console.log(this.order)
      //  let orderDetails = this.order.orderDetails;
      //  for(let i of orderDetails)
      //  list.push(i.id)


      
  }

}
