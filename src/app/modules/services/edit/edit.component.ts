import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ServicesService} from "../../../services/services.service";
import Swal from "sweetalert2";
import {ServiceModel} from "../../../models/Service.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {


  fgValidacion = this.fb.group({
    id: [{value: '', disabled: true}, [Validators.required]],
    origin: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    collectionId: ['', [Validators.required]],
    value: ['', [Validators.required]]
  });

  id: string=''

  constructor(private fb: FormBuilder, private servicesService: ServicesService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    this.find(this.id);
  }

  find(id: string){
    this.servicesService.getWithId(id).subscribe((data: ServiceModel) => {
      console.log(data)
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["origin"].setValue(data.origin)
      this.fgValidacion.controls["destination"].setValue(data.destination)
      this.fgValidacion.controls["date"].setValue(data.date)
      this.fgValidacion.controls["time"].setValue(data.time)
      this.fgValidacion.controls["collectionId"].setValue(data.collectionId)
      this.fgValidacion.controls["value"].setValue(data.value)
    })
  }

  edit(){
    let service = new ServiceModel();
    service.id = this.fgValidacion.controls["id"].value;
    service.origin = this.fgValidacion.controls["origin"].value;
    service.destination = this.fgValidacion.controls["destination"].value;
    service.date = this.fgValidacion.controls["date"].value;
    service.time = this.fgValidacion.controls["time"].value;
    service.collectionId = this.fgValidacion.controls["collectionId"].value;
    service.value = this.fgValidacion.controls["value"].value;

    this.servicesService.update(service).subscribe((data: ServiceModel)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/services/get']);
      },
      (error: any) => {
        console.log(error)
        Swal.fire('Error en el envio', '', 'error')
      })
  }

}
