import { Component, OnInit } from '@angular/core';
import { ReportService } from '../services/report.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-vendor-dashboard',
  templateUrl: './vendor-dashboard.component.html',
  styleUrls: ['./vendor-dashboard.component.css']
})
export class VendorDashboardComponent implements OnInit {

  isAdmin =false;
  currentUser;
  constructor(private reportService: ReportService, private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    if (this.currentUser.role.role == 'admin') {
      this.isAdmin = true;
     
    } else {
      this.isAdmin = false;
    }
  }


}
