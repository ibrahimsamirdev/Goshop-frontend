import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { Label, Color, MultiDataSet } from 'ng2-charts';
import { ReportService } from '../services/report.service';
import { UserService } from '../services/user.service';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2/dist/sweetalert2.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

   mailDto= {"toEmail":"", "subject":"", "body":""};
 

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true, 
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';
  

  // bar

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Apple', 'Banana', 'Kiwifruit', 'Blueberry', 'Orange', 'Grapes'];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Best Fruits' }
  ];
  
  /////

  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

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

  showReport(){
   if(this.isAdmin){
    window.open(environment.reportService+'/report/AdminReportSales', "_blank");
    //  this.showAdminReport();
   }else{
    window.open(environment.reportService+'/report/VendorReportSales/'+ this.currentUser.id, "_blank");
    //  this.showVendorReport(this.currentUser.id);
   }
  }

  showVendorReport(vendorId){
    this.reportService.getVendorReposrt(vendorId).subscribe(data => {
            console.log(">>>> get repoprt for vendor success: ",data)
    },
    (error) => {
        this.showError(error);
    })
  }

  showAdminReport(){
    this.reportService.getAdminReposrt().subscribe(data => {
            console.log(">>>> get repoprt for admin success: ",data)
    },
    (error) => {
        this.showError(error);
    })
  }

  sendEmailReport(){
    // this.mailDto.toEmail = this.currentUser.email;
    this.mailDto.toEmail = "gomaamahmoud922@gmail.com";
    this.mailDto.subject = "Sales Report";
    this.mailDto.body = "Please find attached report";
    if(this.isAdmin){
      this.sendReportEmailToAdmin(this.mailDto);
     }else{
      this.sendReportEmailToVendr(this.mailDto);
     }
  }
  sendReportEmailToAdmin(mailDto){

    this.reportService.emailAdminReposrt(mailDto).subscribe(data => {
      console.log('>>> email sent respose: ',data);
      this.showMessage("Email sent successfully");
    },
    (error) => {
      this.showError(error);
    })
  }

  sendReportEmailToVendr(mailDto){
    this.reportService.emailVendorReposrt(this.currentUser.id, mailDto).subscribe(data => {
      console.log('>>> email sent respose: ',data);
      this.showMessage("Email sent successfully");
    },
    (error) => {
      this.showError(error);
    })
  }

  showError(error){
    Swal.fire({
      title: 'Somthing went wrong',
      text:error,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    });
  }
  showMessage(message){
    Swal.fire({
      title: 'Sent',
      text:message,
      icon: 'error',
      showConfirmButton: false,
      timer: 1500
    });
  }
}
