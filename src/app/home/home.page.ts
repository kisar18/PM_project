import { Component } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  sports: null;
  searchTerm;
  sportsNames;

  constructor(
    private apiService: ApiService,
    ) 
    {
      this.refreshSports();
    }

  async refreshSports(event?) {
    const refresh = event ? true : false;

    await this.apiService.getSports(refresh).pipe(
      finalize(() => {
        if(event) {
          event.target.complete();
        }
      })
    ).subscribe(data => {
      this.sports = data;
      this.sportsNames = data;
      this.sportsNames.forEach(element => {
        delete element['strFormat'];
        delete element['strSportThumb'];
        delete element['strSportDescription'];
      });
    });
  }
}
