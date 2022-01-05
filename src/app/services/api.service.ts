import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { Observable, throwError} from 'rxjs';
import { catchError} from "rxjs/operators";
import { Network} from '@capacitor/network';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

  connected = true;
  apiUrl = 'https://www.thesportsdb.com/api/v1/json/2/all_sports.php';
  
  constructor(
    private http: HttpClient,
    ) {

    Network.addListener('networkStatusChange', async status => {
      this.connected = status.connected;
    });
  } 

  getListItems(url): Observable<any> {
    return this.http.get(url).pipe(catchError(err => this.handleError(err)));
  }

  handleError(err) {
    let errorFromServer = err;
    if(errorFromServer.ok === false) {
      this.connected = false;
    }
    return throwError(errorFromServer);
  }
}
