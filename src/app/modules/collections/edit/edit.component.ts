import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {CollectionService} from "../../../services/collection.service";
import {ActivatedRoute, Router} from "@angular/router";
import {UserModel} from "../../../models/User.model";
import Swal from "sweetalert2";
import {CollectionModel} from "../../../models/Collection.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  fgValidacion = this.fb.group({
    id: [{value: '', disabled: true}, [Validators.required]],
    description: ['', [Validators.required]],
    weight: ['', [Validators.required]],
    type: ['', [Validators.required]],
    presentation: ['', [Validators.required]]
  });

  id: string=''

  constructor(private fb: FormBuilder, private collectionService: CollectionService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.find(this.id);
  }

  find(id: string){
    this.collectionService.getWithId(id).subscribe((data: CollectionModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["description"].setValue(data.description)
      this.fgValidacion.controls["weight"].setValue(data.weight)
      this.fgValidacion.controls["type"].setValue(data.type)
      this.fgValidacion.controls["presentation"].setValue(data.presentation)
    })
  }

  edit(){
    let collection = new CollectionModel();
    collection.id = this.fgValidacion.controls["id"].value;
    collection.description = this.fgValidacion.controls["description"].value;
    collection.weight = this.fgValidacion.controls["weight"].value;
    collection.type = this.fgValidacion.controls["type"].value;
    collection.presentation = this.fgValidacion.controls["presentation"].value;

    this.collectionService.update(collection).subscribe((data: CollectionModel)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/collections/get']);
      },
      (error: any) => {
        console.log(error)
        Swal.fire('Error en el envio', '', 'error')
      })
  }

}
