import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { environment } from 'environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentService {
token=localStorage.getItem('userToken')
headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  constructor(private _httpClient: HttpClient) {

  }
getAllPosts(){
  return this._httpClient.get(`${environment.apiUrl}posts`, { headers: this.headers });
}
AddNew(form:any):Observable<any>{
  return this._httpClient.post(`${environment.apiUrl}posts/store`, form , { headers: this.headers });
}

Delete(post_id:number):Observable<any>{
  return this._httpClient.delete(`${environment.apiUrl}posts/${post_id}`, { headers: this.headers });
}

Update(post_id:number,form:any):Observable<any>{
  return this._httpClient.put(`${environment.apiUrl}posts/${post_id}`, form, { headers: this.headers });
}

GetPostById(post_id:number):Observable<any>{
  return this._httpClient.get(`${environment.apiUrl}posts/${post_id}`, { headers: this.headers });
}
}
