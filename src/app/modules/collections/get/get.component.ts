import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";
import {CollectionService} from "../../../services/collection.service";
import {CollectionModel} from "../../../models/Collection.model";

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  listado: CollectionModel[] = []

  constructor(private collectionService: CollectionService) { }

  ngOnInit(): void {
    this.getAll()
  }


  getAll() {
    this.collectionService.getAll().subscribe((data: CollectionModel[]) => {
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
        this.collectionService.delete(id).subscribe((data: any) => {
          Swal.fire('Eliminado correctamente!', '', 'success')
          this.getAll()
        })
      }
    })
  }
}
