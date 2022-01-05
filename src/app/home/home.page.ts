import { Component, OnInit} from '@angular/core';
import { Network } from '@capacitor/network';
import { ApiService } from '../services/api.service';
import { CacheService } from '../services/cache.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  sports: null;
  sportsCopy = [];
  searchTerm;
  sportsNames = [];

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService,
    ) 
    {
    }

  async ngOnInit() {
      await this.getSports();
  }

  async getSports(event?) {
    const refresh = event ? true : false;

    if(this.apiService.connected) {
      await this.apiService.getListItems(this.apiService.apiUrl).subscribe(data => {
        this.sports = data.sports;
        data.sports.forEach(val => this.sportsCopy.push(Object.assign({}, val)));
        data.sports.forEach(val => this.sportsNames.push(Object.assign({}, val)));
  
        this.sportsCopy.forEach(element => {
          this.cacheService.storage.set(`sport_${element.idSport}`, element);
        });
        this.sportsNames.forEach(element => {
          delete element['strFormat'];
          delete element['strSportThumb'];
          delete element['strSportDescription'];
        });
        this.cacheService.storage.set(this.apiService.apiUrl, this.sports);

      })
      if(event) {
        event.target.complete();
      }
      return;
    }

    const key = this.apiService.apiUrl;
    const requestedSports = await this.cacheService.storage.get(key);
    if (requestedSports == null) {
      return;
    }
    else {
      this.sports = requestedSports;
      requestedSports.forEach(val => this.sportsNames.push(Object.assign({}, val)));
      this.sportsNames.forEach(element => {
        delete element['strFormat'];
        delete element['strSportThumb'];
        delete element['strSportDescription'];
      });
    }

    if(event) {
      event.target.complete();
    }
  }
}
