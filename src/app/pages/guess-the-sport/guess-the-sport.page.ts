import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CacheService } from 'src/app/services/cache.service';

const FIRST_ID = 102;
const LAST_ID = 133;

@Component({
  selector: 'app-guess-the-sport',
  templateUrl: './guess-the-sport.page.html',
  styleUrls: ['./guess-the-sport.page.scss'],
})
export class GuessTheSportPage implements OnInit {
  sport;
  wrongId1;
  wrongId2;
  wrongId3;
  wrongAnswer1;
  wrongAnswer2;
  wrongAnswer3;
  answers;

  constructor(
    private apiService: ApiService,
    private cacheService: CacheService
  ) { }

  ngOnInit() {
    this.getRandomSportImage();
  }

  async getRandomSportImage() {
    const randomId = this.getRandomId();

    if(this.apiService.connected) {

      this.apiService.getListItems(this.apiService.apiUrl).subscribe(data => {
        this.sport = data.sports.find(s => s.idSport === randomId);
        this.getAllAnswers(data.sports);
      });

      return;
    }

    const key = this.apiService.apiUrl;
    const requestedSports = await this.cacheService.storage.get(key);
    if (requestedSports == null) {
      return;
    }
    else {
      this.sport = requestedSports.find(s => s.idSport === randomId)
      this.getAllAnswers(requestedSports);
    }
    
  }

  getRandomId() {
    var randomId = this.getRandomNumber(FIRST_ID, LAST_ID);
    while(randomId === 126) {
      randomId = this.getRandomNumber(FIRST_ID, LAST_ID);
    }
    return randomId.toString();
  }

  getWrongAnswer() {
    var wrongId = this.getRandomId();
    while(this.sport?.idSport === wrongId || wrongId === this.wrongId1 || wrongId === this.wrongId2 || wrongId === this.wrongId3) {
      wrongId = this.getRandomNumber(FIRST_ID, LAST_ID).toString();
  }
    return wrongId;
  }

  getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }

  shuffleAnswers(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

  analyzeChoice() {
    const stringId = ['answer1', 'answer2', 'answer3', 'answer4'];

    for(let i = 0; i < 4; i++) {
      let element = document.getElementById(stringId[i]);
      if(element.innerHTML == this.sport.strSport) {
        element.setAttribute('color', 'success');
  
        stringId.forEach(id => {
          if(id !== stringId[i]) {
            document.getElementById(id).setAttribute('color', 'danger');
          }
        })
      }
    }
  }

  getAllAnswers(list) {
    this.wrongId1 = this.getWrongAnswer();
    this.wrongId2 = this.getWrongAnswer();
    this.wrongId3 = this.getWrongAnswer();
    this.wrongAnswer1 = list.find(s => s.idSport === this?.wrongId1);
    this.wrongAnswer2 = list.find(s => s.idSport === this?.wrongId2);
    this.wrongAnswer3 = list.find(s => s.idSport === this?.wrongId3);
    this.answers = this.shuffleAnswers([this.sport, this.wrongAnswer1, this.wrongAnswer2, this.wrongAnswer3]);
  }

  getNextQuestion() {
    if(document.getElementById('answer1').getAttribute('color') == 'primary') {
      return;
    }
    this.getRandomSportImage();

    const stringId = ['answer1', 'answer2', 'answer3', 'answer4'];
    stringId.forEach(id => {
      document.getElementById(id).setAttribute('color', 'primary');
    })
  }
}
