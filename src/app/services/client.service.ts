import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {Observable} from "rxjs";
import {ClientModel} from "../models/Client.model";

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken()
  }

  create(client: ClientModel): Observable<ClientModel> {
    return this.httpClient.post<ClientModel>(`${this.url}/clients`, {
      document: client.document,
      name: client.name,
      lastname: client.lastname,
      country: client.country,
      city: client.city,
      state: client.state,
      address: client.address,
      phone: client.phone,
      email: client.email
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(client: ClientModel): Observable<ClientModel> {
    return this.httpClient.patch<ClientModel>(`${this.url}/clients/${client.id}`, {
      document: client.document,
      name: client.name,
      lastname: client.lastname,
      country: client.country,
      city: client.city,
      state: client.state,
      address: client.address,
      phone: client.phone,
      email: client.email
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getAll(): Observable<ClientModel[]> {
    return this.httpClient.get<ClientModel[]>(`${this.url}/clients`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  delete(id: String): Observable<ClientModel[]> {
    return this.httpClient.delete<ClientModel[]>(`${this.url}/clients/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }

  getWithId(id: String): Observable<ClientModel> {
    return this.httpClient.get<ClientModel>(`${this.url}/clients/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }
}
