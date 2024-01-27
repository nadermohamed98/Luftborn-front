import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registeration',
  templateUrl: './registeration.component.html',
  styleUrls: ['./registeration.component.scss']
})
export class RegisterationComponent implements OnInit {

  constructor(private _AuthService: AuthService, private _Router: Router) { }

  ngOnInit(): void {
  }
  RegisterForm: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required),
    email: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
  })
  registerSubmition(form: any) {
    this._AuthService.Register({name:form.value.name,email:form.value.email,password:form.value.password}).subscribe(res => {
      console.log(res);
      this._Router.navigate(['/login'])
    })
  }
}
