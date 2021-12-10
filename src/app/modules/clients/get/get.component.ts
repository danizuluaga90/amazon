import { Component, OnInit } from '@angular/core';
import {ClientService} from "../../../services/client.service";
import {UserModel} from "../../../models/User.model";
import {ClientModel} from "../../../models/Client.model";
import Swal from "sweetalert2";

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  listado: ClientModel[] = []

  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.clientService.getAll().subscribe((data: ClientModel[]) => {
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
        this.clientService.delete(id).subscribe((data: any) => {
          Swal.fire('Eliminado correctamente!', '', 'success')
          this.getAll()
        })
      }
    })
  }

}
