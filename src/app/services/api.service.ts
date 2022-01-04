import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable, of} from 'rxjs';
import { switchMap, tap} from "rxjs/operators";
import { CacheService } from './cache.service';
import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { Network } from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  connected = true;
  apiUrl = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';

  constructor(
    private http: HttpClient,
    private cacheService: CacheService
  ) {
    
    Network.addListener('networkStatusChange', async status => {
      this.connected = status.connected;
    });
    
  }

  getSports(forceRefresh): Observable<any> {
    return this.getData(this.apiUrl, forceRefresh).pipe(
      map((res: any) => res.sports)
    );
  }

  private getData(url, forceRefresh): Observable<any> {
    
    if(!this.connected) {
      return from(this.cacheService.getCachedRequest(url));
    }
    
    if(forceRefresh) {
      return this.callAndCache(url);
    }
    else {
      const storedData = from(this.cacheService.getCachedRequest(url));
      return storedData.pipe(
        switchMap(res => {
          if(!res) {
            return this.callAndCache(url);
          }
          else {
            return of(res);
          }
        })
      );
    }
  }

  private callAndCache(url): Observable<any> {
    return this.http.get(url).pipe(
      tap(res => {
        this.cacheService.cacheRequests(url, res);
      })
    );
  }
}
