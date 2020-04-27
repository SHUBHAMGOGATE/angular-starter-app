import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from '../authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm:FormGroup
  constructor(private fb:FormBuilder,private authentication:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required]
    })
  }

  submit(){
    const { username, password } = this.loginForm.value;
    console.log(username,password,this.loginForm.value)
    this.authentication.login(username,password).subscribe(
      res=>{
        if(res.role=="Admin"){
          this.router.navigate(['../admin/home']);
        }
      },
      error=>console.error(error)
    )
  }
}
