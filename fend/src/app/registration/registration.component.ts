import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../Services/todo.service'
declare var $: any;

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private toastr: ToastrService, public todoService: TodoService) { }

  ngOnInit(): void {
  }
  LoginFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  email: Boolean = false
  password: Boolean = false
  invalid: Boolean = false
  passLength: Boolean = false

  registrationFormSubmit() {
    let data = {
      email: this.LoginFormGroup.value.email,
      password: this.LoginFormGroup.value.password,
    }
    if (this.LoginFormGroup.value.email == "" || this.LoginFormGroup.value.email == null) {
      this.email = true;
      return false;
    }
    else if (this.ValidateEmail(this.LoginFormGroup.value.email) == false) {
      this.invalid = true;
      return false;
    }
    else if (this.LoginFormGroup.value.password == "" || this.LoginFormGroup.value.password == null) {
      this.password = true;
      return false;
    }

    else if (this.LoginFormGroup.value.password.length < 6) {
      this.passLength = true;
      return false;
    }

    else {

      this.todoService.registration(data).subscribe(res => {
        let result: any = res
        console.log(res)
        this.LoginFormGroup.reset();
        this.email = false;
        this.password = false;
        this.invalid = false
        this.passLength = false
        this.toastr.success(result['message'], 'Success');


      }, err => {
        console.log(err)
        if (err["error"]["message"].startsWith("celebrate")) {
          this.toastr.error(err["error"]["validation"]["body"]["message"], 'error');
          return
        }
        this.toastr.error(err["error"]["message"], 'error');
      })

    }
    return
  }
  ValidateEmail(input: string) {

    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {

      // alert("Valid email address!");

      // document.form1.text1.focus();

      return true;

    } else {

      // alert("Invalid email address!");

      // document.form1.text1.focus();

      return false;

    }

  }


}
