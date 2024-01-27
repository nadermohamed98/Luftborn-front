import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userData:any=null
  constructor(private _httpClient: HttpClient) {

  }
  DecodeUserToken(){
    let decodeData= JSON.stringify(localStorage.getItem('userToken'))
    let incodeData:any= jwtDecode(decodeData)
    this.userData=incodeData
  }
Register(form:any):Observable<any>{
  return this._httpClient.post(`${environment.apiUrl}register`, form );
}

Login(form:any):Observable<any>{
  return this._httpClient.post(`${environment.apiUrl}login`,  form );
}
logOut(){
  this.userData=null
  localStorage.removeItem("userToken");
  return this._httpClient.post(`${environment.apiUrl}logout`,{})
}
}
