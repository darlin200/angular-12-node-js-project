import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '../models/user.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject!: BehaviorSubject<User>;
  private baseUrl = 'http://localhost:5000';
  public currentUser!: Observable<User>;

  constructor(private http: HttpClient, private router: Router) {
    let currentUserStorage = localStorage.getItem('currentUser');
    // if(currentUserStorage !== null) {
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(currentUserStorage || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
    // }
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string) {
    // post to fake back end, this url will be handled there...
    console.log('fff');
    return this.http
      .post<any>(`${this.baseUrl}/auth/login`, { username, password })
      .pipe(
        map((user) => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  register(username: string, password: string) {
    return this.http
      .post<any>(`${this.baseUrl}/auth/registration`, { username, password })
      .pipe(
        map((user) => {
          // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
          user.authdata = window.btoa(username + ':' + password);
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    console.log('user', localStorage.getItem('currentUser'));
    localStorage.removeItem('currentUser');
    this.router.navigateByUrl('account/login');
    this.currentUserSubject.next(null as any);
  }
}
