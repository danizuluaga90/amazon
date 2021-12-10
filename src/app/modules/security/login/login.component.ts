import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import * as cryptoJS from 'crypto-js';
import {SecurityService} from "../../../services/security.service";
import {Router} from "@angular/router";
import Swal from 'sweetalert2'
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  fgValidacion = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]]
  });


  constructor(private fb: FormBuilder, private securityService: SecurityService, private router: Router) {
  }

  ngOnInit(): void {
  }

  authenticateUser() {
    let user = this.fgValidacion.controls["email"].value;
    let password = this.fgValidacion.controls["password"].value;
    let encryptedPassword = cryptoJS.MD5(password).toString();

    this.securityService.login(user, encryptedPassword).subscribe(
      (data: any) => {
        this.securityService.saveSession(data)
        this.router.navigate(["/index"])
      },
      (error: any) => {
        let httpError = error as HttpErrorResponse;
        console.log(httpError);
        Swal.fire({
          title: 'Error!',
          text: httpError.error.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
        })
      },
      () => {
        console.log("Login Complete")
      }
    )
  }

}
