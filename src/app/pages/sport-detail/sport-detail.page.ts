import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
    private cacheService: CacheService,
  ) { }

  ngOnInit() {
    this.callGetItemDetails();
  }
  
  callGetItemDetails() {
    let id = this.activatedRoute.snapshot.paramMap.get('id');
    this.getSport(id);
    this.getNote(id);
  }

  async getSport(sportId) {
    const key = "sport_" + sportId;
    const requestedSport = await this.cacheService.storage.get(key);
    if (requestedSport == null) {
      return;
    }
    this.sport = requestedSport;
  }

  async getNote(sportId) {
    const key = "note_" + sportId;
    const requestedNote = await this.cacheService.storage.get(key);
    if (requestedNote == null) {
      return;
    }
    document.getElementById('note').innerHTML = requestedNote;
  }

  async setNote() {
    const key =`note_${this.sport.idSport}`
    if(this.note == "") {
      return
    }
    await this.cacheService.storage.set(key, this.note);
    this.getNote(this.sport.idSport);
  }
}
