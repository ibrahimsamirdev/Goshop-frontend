import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrderHistoryService } from '../order-history.service';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
 

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {
  orders;
  errorMessage;

  constructor(public matDialog: MatDialog,
    private userService: UserService,
    private orderHistoryservice:OrderHistoryService, private router: Router) { }

  ngOnInit(): void {
    let currentUser = this.userService.getCurrentUser();
    
    if(currentUser != null){
     
      this.getAllOrdersFortheUser(currentUser.id);
    }else{
      this.errorMessage= "please login first"
    }
    
  }
  getAllOrdersFortheUser(id) {
    this.orderHistoryservice.getAllOrders(id).subscribe(data => {
      this.orders = data;
      if(this.orders == null){
        this.orders =[];
      }

    },
    (error) => {
      this.errorMessage = error;
    });
  }
  orderDetails(id){
    //  let  list=[];
    //  for(let i of orderDetailsList)
    //   list.push(i.id)
    
      
      this.router.navigate(['/orderDetails'], { queryParams: { id: id } });
      
  }
}
