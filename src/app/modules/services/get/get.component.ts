import { Component, OnInit } from '@angular/core';
import {ServiceModel} from "../../../models/Service.model";
import {ServicesService} from "../../../services/services.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  listado: ServiceModel[] = []

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.getAll()
  }

  getAll() {
    this.servicesService.getAll().subscribe((data: ServiceModel[]) => {
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
        this.servicesService.delete(id).subscribe((data: any) => {
          Swal.fire('Eliminado correctamente!', '', 'success')
          this.getAll()
        })
      }
    })
  }
}
