import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { User } from 'src/Models/User';
import { AuthenticationService } from 'src/services/authentication.service';
import { MustMatch } from 'src/_helpers/must_match.validator';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent {
  registerForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
              private authenticationService: AuthenticationService,
              private toast : HotToastService,
              private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group(
      {
        title: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
        acceptTerms: [false, Validators.requiredTrue],
      },
      {
        validator: MustMatch('password', 'confirmPassword'),
      }
    );
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (!this.registerForm.valid) {
      return;
    }else{
       const {title,firstName,email,lastName,password,acceptTerms}:User = this.registerForm.value;
       let user: User = {
        firstName : firstName,
        lastName : lastName,
        email: email,
        title: title,
        password: password,
        acceptTerms: acceptTerms
       };

       this.authenticationService.signUp(user).pipe(
        this.toast.observe({
          success: 'SignUp Successfully please login to continue',
          loading: 'Loading in .... ',
          error: 'There is an error signning up'
        })
       ).subscribe(() =>{
          this.router.navigate(['login']);
       });
    }

    // display form values on success
    
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
