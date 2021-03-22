import { Component, OnInit, NgZone } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TodoService } from '../Services/todo.service'
import { CookieService } from 'ngx-cookie-service'
declare var $: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private toastr: ToastrService, private _router: Router, public todoService: TodoService, private cookieService: CookieService, private zone: NgZone) {

  }

  ngOnInit() {
    if (this.cookieService.check("todo_token")) this._router.navigate(['dashboard'])
  }
  LoginFormGroup = new FormGroup({
    email: new FormControl(),
    password: new FormControl(),
  })

  email: Boolean = false
  password: Boolean = false
  invalid: Boolean = false
  // passLength: Boolean = false

  loginFormSubmit() {
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


    else {
      this.todoService.login(data).subscribe(res => {
        let result: any = res
        const dateNow = new Date();
        dateNow.setDate(dateNow.getDate() + 1);
        this.cookieService.set('todo_token', String(result['token']), { expires: dateNow, sameSite: 'Lax' })
        this.LoginFormGroup.reset();
        this.email = false;
        this.password = false;
        this.invalid = false
        this._router.navigate(['dashboard'])

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
      return true;
    } else {
      return false;
    }

  }

}
