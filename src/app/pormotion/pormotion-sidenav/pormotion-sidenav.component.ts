import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-pormotion-sidenav',
  templateUrl: './pormotion-sidenav.component.html',
  styleUrls: ['./pormotion-sidenav.component.css']
})
export class PormotionSidenavComponent implements OnInit {

  isAdmin = false;
  constructor(private userService: UserService) { }

  ngOnInit(): void {

    let currentUser = this.userService.getCurrentUser();
     if(currentUser.role.role =='admin'){
      this.isAdmin =true;
    }
  }

}
