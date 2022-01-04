import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as CordovaSQLiteDriver from 'localforage-cordovasqlitedriver';

const CACHE_KEY = '_my_cached_';

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

  cacheRequests(url, data) {
    url = `${CACHE_KEY}${url}`;

    return this.storage.set(url, data);
  }

  async getCachedRequest(url) {
    url = `${CACHE_KEY}${url}`;

    const storedData = await this.storage.get(url);

    if(!storedData) {
      return null;
    }
    else {
      return storedData;
    }
  }
}
