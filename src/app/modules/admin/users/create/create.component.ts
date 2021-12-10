import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {Router} from "@angular/router";
import {UserModel} from "../../../../models/User.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgValidacion = this.fb.group({
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
  });


  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) {
  }

  ngOnInit(): void {
  }

  create() {
    let user = new UserModel();
    user.name = this.fgValidacion.controls["name"].value
    user.lastName = this.fgValidacion.controls["lastName"].value
    user.email = this.fgValidacion.controls["email"].value
    user.phone = this.fgValidacion.controls["phone"].value

    this.userService.create(user).subscribe((data:UserModel) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/admin/get']);
    }, (error: any) => {
      console.log(error)
      Swal.fire('Error en el envio', '', 'error')
    })

  }

}
