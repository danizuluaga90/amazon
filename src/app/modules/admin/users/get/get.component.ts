import {Component, OnInit} from '@angular/core';
import {UserService} from "../../../../services/user.service";
import {UserModel} from "../../../../models/User.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  listado: UserModel[] = []

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.userService.getAll().subscribe((data: UserModel[]) => {
      this.listado = data
      console.log(data)
    })
  }

  delete(id?: any) {
    console.log(id)
    Swal.fire({
      title: "Estas seguro que deseas eliminar este registro?",
      showCancelButton: true,
      confirmButtonText: "Aceptar"
    }).then((result) => {
      if(result.isConfirmed) {
        this.userService.delete(id).subscribe((data: any) => {
          Swal.fire('Eliminado correctamente!', '', 'success')
          this.getAll()
        })
      }
    })
  }

}
