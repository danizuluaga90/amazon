import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {Observable} from "rxjs";
import {ServiceModel} from "../models/Service.model";

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken()
  }

  create(service: ServiceModel): Observable<ServiceModel> {
    return this.httpClient.post<ServiceModel>(`${this.url}/services`, {
      origin: service.origin,
      destination: service.destination,
      date: service.date,
      time: service.time,
      collectionId: service.collectionId,
      value: service.value
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(service: ServiceModel): Observable<ServiceModel> {
    return this.httpClient.patch<ServiceModel>(`${this.url}/services/${service.id}`, {
      origin: service.origin,
      destination: service.destination,
      date: service.date,
      time: service.time,
      collectionId: service.collectionId,
      value: service.value
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getAll(): Observable<ServiceModel[]> {
    return this.httpClient.get<ServiceModel[]>(`${this.url}/services`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  delete(id: String): Observable<ServiceModel[]> {
    return this.httpClient.delete<ServiceModel[]>(`${this.url}/services/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }

  getWithId(id: String): Observable<ServiceModel> {
    return this.httpClient.get<ServiceModel>(`${this.url}/services/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }
}
