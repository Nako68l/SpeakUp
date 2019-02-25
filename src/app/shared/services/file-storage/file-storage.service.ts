import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { mergeMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class FileStorageService {
  constructor(private storage: AngularFireStorage) {}

  upload(filePath, event): [Observable<number | undefined>, Observable<string>] {
    const file = event.target.files[0];
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    const uploadPercent = task.percentageChanges();
    const downloadURL = task.snapshotChanges().pipe(mergeMap(() => fileRef.getDownloadURL()));
    return [uploadPercent, downloadURL];
  }
}
