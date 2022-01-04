import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { Storage } from '@ionic/storage-angular';
import { CacheService } from 'src/app/services/cache.service';

@Component({
  selector: 'app-sport-detail',
  templateUrl: './sport-detail.page.html',
  styleUrls: ['./sport-detail.page.scss'],
})
export class SportDetailPage implements OnInit {
  sport;
  note: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private cacheService: CacheService,
  ) { }

  ngOnInit() {
    this.callGetItemDetails();
  }
  
  callGetItemDetails() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    
    this.apiService.getSports(this.apiService.apiUrl).subscribe(data => {
      this.sport = data.find(s => s.idSport === id);
      this.getNote();
    });
  }

  async getNote() {
    const key =`note_${this.sport.strSport}`
    const requestedNote = await this.cacheService.storage.get(key);
    if (requestedNote == null) {
      return;
    }
    document.getElementById('note').innerHTML = requestedNote;
  }

  async setNote() {
    const key =`note_${this.sport.strSport}`
    if(this.note == "") {
      return
    }
    await this.cacheService.storage.set(key, this.note);
    this.getNote();
  }
}
