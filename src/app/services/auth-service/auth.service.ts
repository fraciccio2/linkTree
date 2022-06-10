import {Injectable} from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Observable} from "rxjs";
import {UserDataAccessService} from "../../components/user-data-access/user-data-access.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$!: Observable<any>;

  constructor(private afAuth: AngularFireAuth,
              private userDataAccess: UserDataAccessService) {
    this.user$ = afAuth.authState;
  }

  signIn(email: string, password: string){
     return this.afAuth.createUserWithEmailAndPassword(email, password);
  }

  logIn(email: string, password: string){
    return this.afAuth.signInWithEmailAndPassword(email, password);
  }

  signOut(){
    return this.afAuth.signOut();
  }
}
