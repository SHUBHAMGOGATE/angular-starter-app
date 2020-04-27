import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder,private userService:UserService) { }
  AdminOrNot='User'
  register_form:FormGroup;
  ngOnInit(): void {
    this.register_form=this.fb.group({
      username:['',Validators.required],
      password:['',Validators.required],
      firstName:['',Validators.required],
      lastName:['',Validators.required],
      role:[false]
    })
  }
  submit(){
    this.register_form.patchValue({admin:(this.register_form.value.role?'Admin':'User')});
    console.log(this.register_form.value)
    this.userService.addUser(this.register_form.value).subscribe(
      res=>console.log("Registered Succesfully")
    )
  }
}
