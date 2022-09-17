import { Injectable } from '@angular/core';
import { Auth, authState, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from '@angular/fire/auth';
import { from } from 'rxjs';
import { User } from 'src/Models/User';
import { switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  currentUser$ = authState(this.auth);

  constructor(protected auth: Auth) { }

  login(email: string, password: string){
    return from(signInWithEmailAndPassword(this.auth, email, password));
  }

  logout(){
     return from(this.auth.signOut());
  }

  signUp(user: User){
    return from(createUserWithEmailAndPassword(this.auth,user.email,user.password)).pipe
    (switchMap(({user}) => updateProfile(user, user)));
  }
}
