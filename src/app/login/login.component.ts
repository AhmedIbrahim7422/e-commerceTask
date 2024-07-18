import { Component, signal } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm: any
  constructor(private authService: AuthService, private router: Router, public formBuilder: FormBuilder){
    this.loginForm = formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    })
  }

  failed:boolean = false

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  login() {
    console.log(this.loginForm.value);
    
    if (this.authService.login(this.loginForm.value.username, this.loginForm.value.password)) {
      this.router.navigate([this.authService.currentUser]);
    } else {
      this.failed = true
    }
  }
}
