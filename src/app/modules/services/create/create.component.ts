import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {ServicesService} from "../../../services/services.service";
import Swal from "sweetalert2";
import {ServiceModel} from "../../../models/Service.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgValidacion = this.fb.group({
    origin: ['', [Validators.required]],
    destination: ['', [Validators.required]],
    date: ['', [Validators.required]],
    time: ['', [Validators.required]],
    collectionId: ['', [Validators.required]],
    value: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder, private servicesService: ServicesService, private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    let service = new ServiceModel();
    service.origin = this.fgValidacion.controls["origin"].value
    service.destination = this.fgValidacion.controls["destination"].value
    service.date = this.fgValidacion.controls["date"].value
    service.time = this.fgValidacion.controls["time"].value
    service.collectionId = this.fgValidacion.controls["collectionId"].value
    service.value = this.fgValidacion.controls["value"].value

    this.servicesService.create(service).subscribe((data:ServiceModel) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/services/get']);
    }, (error: any) => {
      console.log(error)
      Swal.fire('Error en el envio', '', 'error')
    })

  }

}
