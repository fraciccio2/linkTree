import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "@angular/fire/compat/database";
import {BehaviorSubject, Observable} from "rxjs";
import {AngularFireStorage} from "@angular/fire/compat/storage";
import {ButtonCollectorModel, HeaderCollectorModel} from "../../utils";
import {map, take} from 'rxjs/operators';

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

  getHeaderCollector(id: string): Observable<{key: string | null; value: HeaderCollectorModel}[]> {
    return this.afDataBase.list('/headers/' + id).snapshotChanges().pipe(
      map(header =>
        header.map(h => (
          {
            key: h.payload.key,
            value: h.payload.val()
          } as { key: string | null; value: HeaderCollectorModel }))
      )
    );
  }

  saveButtonCollector(userId: string, headerId: string, button: ButtonCollectorModel) {
    return this.afDataBase.list('/buttons/' + userId + '/' + headerId).push(button);
  }

  updateButtonCollector(userId: string, headerId: string, buttonId: string, button: ButtonCollectorModel) {
    return this.afDataBase.object('/buttons/' + userId + '/' + headerId + '/' + buttonId).update(button);
  }

  getButtonsCollector(userId: string) {
    return this.afDataBase.list<{ key: ButtonCollectorModel }>('/buttons/' + userId).snapshotChanges().pipe(
      map(button =>
        button.map(b => (
          {
            headerKey: b.payload.key,
            value: b.payload.val()
          }))
      )
    );
  }

  deleteCollector(id: string, key: string) {
    return this.afDataBase.list('/headers/' + id + '/' + key).remove();
  }

  deleteButton(userId: string, headerId: string, key: string) {
    return this.afDataBase.list('/buttons/' + userId + '/' + headerId + '/' + key).remove();
  }

  getButtonByKey(userId: string, headerId: string, buttonId: string): Observable<ButtonCollectorModel | null> {
    return this.afDataBase.object<ButtonCollectorModel>('/buttons/' + userId + '/' + headerId + '/' + buttonId).valueChanges();
  }

  moveButton(userId: string, headerId: string, buttonList: { [key: string]: ButtonCollectorModel }) {
    return this.afDataBase.object('/buttons/' + userId + '/' + headerId).set(buttonList);
  }

  getButtonsLength(userId: string, headerId: string) {
    return this.afDataBase.list('/buttons/' + userId + '/' + headerId).valueChanges().pipe(map((list) => {
      return list.length;
    }), take(1));
  }
}
