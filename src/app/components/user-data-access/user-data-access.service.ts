import {Injectable} from '@angular/core';
import {AngularFireDatabase, SnapshotAction} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {HeaderCollectorModal} from "../../utils";

@Injectable({
  providedIn: 'root'
})
export class UserDataAccessService {
  sideActive = new BehaviorSubject<string | undefined>(undefined);

  constructor(private afDataBase: AngularFireDatabase, private afStorage: AngularFireStorage) {
  }

  saveNickName(nickname: string) {
    const id = localStorage.getItem('userId');
    this.afDataBase.object('/nicknames/' + id).set(nickname);
  }

  getNickName(id: string): Observable<string | null> {
    return this.afDataBase.object<string>('/nicknames/' + id).valueChanges();
  }

  changeNickName(id: string, nickname: string) {
    return this.afDataBase.object('nicknames/' + id).set(nickname);
  }

  saveImageIconOnStore(file: File) {
    return this.afStorage.upload(file.name, file);
  }

  saveImageIconOnDataBase(id: string, path: string) {
    return this.afDataBase.object('/icons/' + id).set(path);
  }

  getImageIcon(id: string): Observable<string | null> {
    return this.afDataBase.object<string>('/icons/' + id).valueChanges();
  }

  removeImageFromDatabase(id: string) {
    return this.afDataBase.object('/icons/' + id).remove();
  }

  url(name: string) {
    return this.afStorage.ref(name);
  }

  saveHeaderCollector(header: HeaderCollectorModal, id: string) {
    return this.afDataBase.list('/headers/' + id).push(header);
  }

  getHeaderCollector(id: string){
    return this.afDataBase.list('/headers/' +id).snapshotChanges();
  }
}
