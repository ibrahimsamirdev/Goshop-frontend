import { Component, OnInit } from '@angular/core';
import { error } from 'protractor';
import { UserService } from '../services/user.service';
  
@Component({
  selector: 'app-vendor-employees',
  templateUrl: './vendor-employees.component.html',
  styleUrls: ['./vendor-employees.component.css']
})
export class VendorEmployeesComponent implements OnInit {

  displayedColumns: string[] = ['name', 'email', 'role', 'action'];
  users;
  errorMessage;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
    
    if(currentUser != null){
      let vendorId = currentUser.id;
      this.getVendorEmployees(vendorId);
    }else{
      this.errorMessage= "please login first"
    }
  
    
  }

  getVendorEmployees(vendorId){
    this.userService.vendorEmployees(vendorId).subscribe(data => {
      this.users = data;
    },
    (error) => {
      this.errorMessage = error;
    });
  }

}
