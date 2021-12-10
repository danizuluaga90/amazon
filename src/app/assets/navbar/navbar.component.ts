import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../services/security.service";
import {Subscription} from "rxjs";
import {UserModel} from "../../models/User.model";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  activeSession?:boolean = false;
  subs: Subscription = new Subscription();

  constructor(private securityService: SecurityService) { }

  ngOnInit(): void {
    this.subs = this.securityService.sessionUserData.subscribe((data: UserModel) => {
      console.log(data)
      this.activeSession = data.isLoggedIn;
    })

  }

}
