import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {ClientService} from "../../../services/client.service";
import {ActivatedRoute, Router} from "@angular/router";
import Swal from "sweetalert2";
import {ClientModel} from "../../../models/Client.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  fgValidacion = this.fb.group({
    id: [{value: '', disabled: true}, [Validators.required]],
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

  id: string=''

  constructor(private fb: FormBuilder, private clientService: ClientService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params["id"]
    console.log(this.id)
    this.find(this.id);
  }

  find(id: string){
    this.clientService.getWithId(id).subscribe((data: ClientModel) => {
      this.fgValidacion.controls["id"].setValue(id)
      this.fgValidacion.controls["document"].setValue(data.document)
      this.fgValidacion.controls["name"].setValue(data.name)
      this.fgValidacion.controls["lastname"].setValue(data.lastname)
      this.fgValidacion.controls["country"].setValue(data.country)
      this.fgValidacion.controls["city"].setValue(data.city)
      this.fgValidacion.controls["state"].setValue(data.state)
      this.fgValidacion.controls["address"].setValue(data.address)
      this.fgValidacion.controls["email"].setValue(data.email)
      this.fgValidacion.controls["phone"].setValue(data.phone)
    })
  }

  edit(){
    let client = new ClientModel();
    client.id = this.fgValidacion.controls["id"].value;
    client.document = this.fgValidacion.controls["document"].value;
    client.name = this.fgValidacion.controls["name"].value;
    client.lastname = this.fgValidacion.controls["lastname"].value;
    client.country = this.fgValidacion.controls["country"].value;
    client.city = this.fgValidacion.controls["city"].value;
    client.state = this.fgValidacion.controls["state"].value;
    client.address = this.fgValidacion.controls["address"].value;
    client.email = this.fgValidacion.controls["email"].value;
    client.phone = this.fgValidacion.controls["phone"].value;

    this.clientService.update(client).subscribe((data: ClientModel)=> {
        Swal.fire('Editado Correctamente!', '', 'success')
        this.router.navigate(['/clients/get']);
      },
      (error: any) => {
        console.log(error)
        Swal.fire('Error en el envio', '', 'error')
      })
  }
}
