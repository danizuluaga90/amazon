import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CollectionService} from "../../../services/collection.service";
import {Router} from "@angular/router";
import {UserModel} from "../../../models/User.model";
import Swal from "sweetalert2";
import {CollectionModel} from "../../../models/Collection.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgValidacion = this.fb.group({
    description: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    type: ['', [Validators.required]],
    presentation: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private collectionService: CollectionService, private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    let collection = new CollectionModel();
    collection.description = this.fgValidacion.controls["description"].value
    collection.weight = this.fgValidacion.controls["weight"].value
    collection.type = this.fgValidacion.controls["type"].value
    collection.presentation = this.fgValidacion.controls["presentation"].value

    this.collectionService.create(collection).subscribe((data:CollectionModel) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/collections/get']);
    }, (error: any) => {
      console.log(error)
      Swal.fire('Error en el envio', '', 'error')
    })

  }

}
