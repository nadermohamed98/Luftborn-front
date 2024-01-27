import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
  }
  LoginForm: FormGroup = new FormGroup({
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })
  loginSubmition(form: any) {
    this._AuthService.Login({email:form.value.email,password:form.value.password}).subscribe(res => {
     console.log(res.Error);
      if(res.status === "success"){
        localStorage.setItem("userToken", res.authorisation.token)
        this._AuthService.DecodeUserToken();
        this._Router.navigate(['/posts'])
      }else{
        Swal.fire(res.message);
      }
    })
  }
}
