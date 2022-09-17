import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  FormArray,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthenticationService } from 'src/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
 // loginForm: FormGroup;
  loginForm : FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });


  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private toast : HotToastService,
    ) {}


  onSubmit() {
    if (this.loginForm.valid) {
      const {email,password} = this.loginForm.value;
      this.authenticationService.login(email,password).pipe(
        this.toast.observe({
          success: 'Logged In Successfully',
          loading: 'Loading in .... ',
          error: 'There is an error loggin'
        })
      ).subscribe(() => {
        this.router.navigate(['/home'])

      });

    }else{
       this.loginForm.markAllAsTouched();
    }
  }
  
}
