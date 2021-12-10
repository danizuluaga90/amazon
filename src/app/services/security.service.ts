import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {UserModel} from "../models/User.model";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  url = "http://localhost:3000";
  sessionUserData = new BehaviorSubject<UserModel>(new UserModel());

  constructor(private httpClient: HttpClient) {
    this.validateSession()
  }

  login(email: String, password: String): Observable<any> {
    return this.httpClient.post(`${this.url}/login`, {user: email, password: password}, {headers: new HttpHeaders({})})
  }

  saveSession(data: any): Boolean {
    let sessionData = localStorage.getItem("sessionData");
    if (sessionData) {
      return false;
    } else {
      // Definimos los datos a almacenar
      let payload = {
        id: data?.data.id,
        username: data?.data.nombre + " " + data?.data.apellidos ,
        token: data.token,
        isLoggedIn: true
      };
      // Lo convertimos a string
      let datosString = JSON.stringify(payload);
      // Almacenamos los datos en el localStorage
      localStorage.setItem("sessionData", datosString);
      // Definimos una bandera de session
      data.isLoggedIn = true;
      // Refrescamos los datos de la session
      this.refreshSessionData(data);
      return true;
    }
  }

  refreshSessionData(data: any) {
    this.sessionUserData.next(data)
  }

  deleteSession() {
    localStorage.removeItem("sessionData")
    this.refreshSessionData(new UserModel)
  }

  validateSession() {
    let data = this.isLoggedIn();
    if(data) {
      this.refreshSessionData(data)
    }
  }

  isLoggedIn() {
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData) {
      let data = JSON.parse(sessionData)
      return data
    }
    return null
  }

  getToken(){
    let sessionData = localStorage.getItem("sessionData");
    if(sessionData){
      let data = JSON.parse(sessionData);
      return data.token;
    }
    return ''
  }

}
