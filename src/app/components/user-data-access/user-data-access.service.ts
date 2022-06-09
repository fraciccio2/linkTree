import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserDataAccessService {
  userId = new BehaviorSubject<number | undefined>(undefined);

  constructor(private afDataBase: AngularFireDatabase) {
  }

  saveNickName(nickname: string) {
    const id = localStorage.getItem('userId');
    this.afDataBase.object('/nicknames/' + id).set(nickname);
  }

  getNickName(id: string): Observable<string | null> {
    return this.afDataBase.object<string>('/nicknames/' + id).valueChanges();
  }

  changeNickName(id: string, nickname: string){
    return this.afDataBase.object('nicknames/' +id).update(nickname);
  }
}
