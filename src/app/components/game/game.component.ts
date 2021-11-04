import { Component, OnDestroy, OnInit } from '@angular/core';
import { IPlayerScore } from '@app/models/player.interface';
import { StorageService } from '@app/services/storage/storage.service';

const RED: string = 'rgb(255, 0, 0)';
const GREEN: string = 'rgb(0, 255, 0)';
const LEFT: string = 'left';
const RIGHT: string = 'right';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit, OnDestroy {

  private current: string = '';
  private lastStep: string = '';
  public timedColor: string = RED;
  public maxScore: number = 0;
  public score: number = 0;

  constructor(
    private storageService: StorageService,
  ) {
    this.current = JSON.parse(this.storageService.get('isLoggedIn'));
    if (this.storageService.hasOwnProperty(this.current)) {
      const currentPlayer: IPlayerScore = JSON.parse(this.storageService.get(this.current))
      this.maxScore = currentPlayer.maxScore;
      this.score = currentPlayer.score;
    }
  }

  ngOnInit(): void {
    this.randomizeInterval();
  }

  private getMaxIntFromScore = (): number => {
    return Math.max(10000 - this.score * 100, 2000);
  }

  private randomIntFromInterval = (): number => {
    const min = -1500;
    const max = 1500;
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  private randomizeInterval = () => {
    let time: number = 3_000;
    this.changeSemaphoreColor();
    if (this.timedColor === GREEN) {
      const max = this.getMaxIntFromScore();
      const rand = this.randomIntFromInterval();
      time = max + rand > 10_000 ? 10_000 : (max + rand);
    }
    console.log(`Wait for ${time} seconds`);
    setTimeout(() => { this.randomizeInterval() }, time);
  }

  private changeSemaphoreColor = () => {
    if (this.timedColor === RED) this.timedColor = GREEN;
    else this.timedColor = RED;
  }

  private increaseScore = () => {
    this.score++;
    if (this.score > this.maxScore) {
      this.maxScore = this.score;
    }
    const currentPlayer: IPlayerScore = {
      maxScore: this.maxScore,
      score: this.score
    }
    this.storageService.set(this.current, JSON.stringify(currentPlayer));
  }

  private decreaseScore = () => {
    if (this.score !== 0) {
      this.score--;
      const currentPlayer: IPlayerScore = {
        maxScore: this.maxScore,
        score: this.score
      }
      this.storageService.set(this.current, JSON.stringify(currentPlayer));
    }
  }

  public stepButtonLeft = () => {
    if (this.timedColor === RED || this.lastStep === LEFT) {
      this.decreaseScore();
    } else {
      this.lastStep = LEFT;
      this.increaseScore();
    }
  }

  public stepButtonRight = () => {
    if (this.timedColor === RED || this.lastStep === RIGHT) {
      this.decreaseScore();
    } else {
      this.lastStep = RIGHT;
      this.increaseScore();
    }
  }

  ngOnDestroy(): void {
    clearInterval();
  }
}
