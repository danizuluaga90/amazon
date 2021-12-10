import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ClientService} from "../../../services/client.service";
import {Router} from "@angular/router";
import Swal from "sweetalert2";
import {ClientModel} from "../../../models/Client.model";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  fgValidacion = this.fb.group({
    document: ['', [Validators.required]],
    name: ['', [Validators.required]],
    lastname: ['', [Validators.required]],
    country:  ['', [Validators.required]],
    city:  ['', [Validators.required]],
    state:  ['', [Validators.required]],
    address:  ['', [Validators.required]],
    phone: ['', [Validators.required, Validators.minLength(6)]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    let client = new ClientModel();
    client.document = this.fgValidacion.controls["document"].value
    client.name = this.fgValidacion.controls["name"].value
    client.lastname = this.fgValidacion.controls["lastname"].value
    client.country = this.fgValidacion.controls["country"].value
    client.city = this.fgValidacion.controls["city"].value
    client.state = this.fgValidacion.controls["state"].value
    client.address = this.fgValidacion.controls["address"].value
    client.email = this.fgValidacion.controls["email"].value
    client.phone = this.fgValidacion.controls["phone"].value

    console.log(JSON.stringify(client))

    this.clientService.create(client).subscribe((data:ClientModel) => {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/clients/get']);
    }, (error: any) => {
      console.log(error)
      Swal.fire('Error en el envio', '', 'error')
    })

  }

}
