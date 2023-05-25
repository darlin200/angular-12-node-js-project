import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/services/auth.service';

// import { AuthenticationService } from '../../services/auth.service';

@Component({ templateUrl: 'registration.component.html' })
export class RegistrationComponent implements OnInit {
  loading = false;
  submitted = false;
  error: any;
  private returnUrl!: string;
  registrationForm: FormGroup;
  constructor(
    
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {
    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
    this.registrationForm = this.formBuilder.group({
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
    return this.registrationForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registrationForm.invalid) {
      return;
    }

    this.loading = true;
    this.authenticationService
      .register(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        (data: unknown) => {
          this.router.navigate(['/tutorials']);
        },
        (error: any) => {
          console.log('error', error.error.message);
          this.error = error;

          this.loading = false;
        }
      );
  }
}
