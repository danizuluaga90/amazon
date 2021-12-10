import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {Observable} from "rxjs";
import {CollectionModel} from "../models/Collection.model";

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken()
  }

  create(collection: CollectionModel): Observable<CollectionModel> {
    return this.httpClient.post<CollectionModel>(`${this.url}/collections`, {
      description: collection.description,
      type: collection.type,
      weight: collection.weight,
      presentation: collection.presentation
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(collection: CollectionModel): Observable<CollectionModel> {
    return this.httpClient.patch<CollectionModel>(`${this.url}/collections/${collection.id}`, {
      description: collection.description,
      type: collection.type,
      weight: collection.weight,
      presentation: collection.presentation
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getAll(): Observable<CollectionModel[]> {
    return this.httpClient.get<CollectionModel[]>(`${this.url}/collections`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  delete(id: String): Observable<CollectionModel[]> {
    return this.httpClient.delete<CollectionModel[]>(`${this.url}/collections/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }

  getWithId(id: String): Observable<CollectionModel> {
    return this.httpClient.get<CollectionModel>(`${this.url}/collections/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }
}
