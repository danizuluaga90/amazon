import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {SecurityService} from "./security.service";
import {UserModel} from "../models/User.model";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url = "http://localhost:3000"
  token: string = ''

  constructor(private httpClient: HttpClient, private securityService: SecurityService) {
    this.token = this.securityService.getToken()
  }

  create(user: UserModel): Observable<UserModel> {
    return this.httpClient.post<UserModel>(`${this.url}/users`, {
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  update(user: UserModel): Observable<UserModel> {
    return this.httpClient.patch<UserModel>(`${this.url}/users/${user.id}`, {
      name: user.name,
      lastName: user.lastName,
      phone: user.phone,
      email: user.email
    }, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  getAll(): Observable<UserModel[]> {
    return this.httpClient.get<UserModel[]>(`${this.url}/users`, {
      headers: new HttpHeaders({
        "Authorization": `Bearer ${this.token}`
      })
    })
  }

  delete(id: String): Observable<UserModel[]> {
    return this.httpClient.delete<UserModel[]>(`${this.url}/users/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }

  getWithId(id: String): Observable<UserModel> {
    return this.httpClient.get<UserModel>(`${this.url}/users/${id}`, {headers: new HttpHeaders({"Authorization": `Bearer ${this.token}`})})
  }
}
