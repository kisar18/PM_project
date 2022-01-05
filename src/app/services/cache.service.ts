import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  data = [];

  constructor(public storage: Storage) { }

  async initStorage() {
    await this.storage.defineDriver(CordovaSQLiteDriver);
    await this.storage.create();
  }
}
