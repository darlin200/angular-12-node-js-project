import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';
import { select, Store } from "@ngrx/store";
import { State } from 'src/app/state/auth.reducer';
import * as UserActions from "src/app/state/auth.actions"

// import { AuthenticationService } from '../../services/auth.service';

@Component({ templateUrl: 'login.component.html' })
export class LoginComponent implements OnInit {
  loading = false;
  submitted = false;
  error: any;
  private returnUrl!: string;
  loginForm: FormGroup;
  constructor(
    private store: Store<{ user: State }>,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
    this.loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
      });
  }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['/'];
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    console.log('forma je');
    this.store.dispatch( new UserActions.LogIn({ payload: {username: this.f.username.value, password: this.f.password.value } }));
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = false

   
    // this.authenticationService
    //   .login(this.f.username.value, this.f.password.value)
    //   .pipe(first())
    //   .subscribe(
    //     (data) => {
    //       this.router.navigate(['/tutorials']);
    //     },
    //     (error) => {
    //       console.log('error', error.error.message);
    //       this.error = error;

    //       this.loading = false;
    //     }
    //   );
  }
}
