import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ButtonCollectorModel, HeaderCollectorModel} from "../../utils";

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

  saveHeaderCollector(header: HeaderCollectorModel, id: string) {
    return this.afDataBase.list('/headers/' + id).push(header);
  }

  getHeaderCollector(id: string) {
    return this.afDataBase.list('/headers/' + id).snapshotChanges();
  }

  saveButtonCollector(userId: string, headerId: string, button: ButtonCollectorModel) {
    return this.afDataBase.list('/buttons/' + userId + '/' + headerId).push(button);
  }

  getButtonsCollector(userId: string): Observable<{ key: ButtonCollectorModel }[]> {
    return this.afDataBase.list<{ key: ButtonCollectorModel }>('/buttons/' + userId).valueChanges();
  }

  deleteCollector(id: string, key: string) {
    return this.afDataBase.list('/headers/' + id + '/' + key).remove();
  }
}
