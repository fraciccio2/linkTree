import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class UserDataAccessService {

  constructor(private afDataBase: AngularFireDatabase, private afStorage: AngularFireStorage) {
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

  saveImageIconOnStore(file: File){
    return this.afStorage.upload(file.name, file);
  }

  saveImageIconOnDataBase(id: string, path: string){
    this.afDataBase.object('/icons/' +id).update(path);
  }

  url(name: string){
    return this.afStorage.ref(name);
  }
}
