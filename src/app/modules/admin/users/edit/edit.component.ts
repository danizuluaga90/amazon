import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../../services/user.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../../../models/User.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  fgValidacion = this.fb.group({
    id: [{value: '', disabled: true}, [Validators.required]],
    name: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
  });

  id: string=''

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.find(this.id);
  }

  find(id: string){
    this.userService.getWithId(id).subscribe((data: UserModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["name"].setValue(data.name)
      this.fgValidacion.controls["lastName"].setValue(data.lastName)
      this.fgValidacion.controls["email"].setValue(data.email)
      this.fgValidacion.controls["phone"].setValue(data.phone)
    })
  }

  edit(){
    let user = new UserModel();
    user.id = this.fgValidacion.controls["id"].value;
    user.name = this.fgValidacion.controls["name"].value;
    user.lastName = this.fgValidacion.controls["lastName"].value;
    user.email = this.fgValidacion.controls["email"].value;
    user.phone = this.fgValidacion.controls["phone"].value;

    this.userService.update(user).subscribe((data: UserModel)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/admin/get']);
      },
      (error: any) => {
        console.log(error)
        Swal.fire('Error en el envio', '', 'error')
      })
  }



}
