import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { IPlayerScore } from '@app/models/player.interface';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private storageService: StorageService,
    private router: Router
    ) {
  }

  login(username: string) {
    // login successful 
    if (username) {
      // store user details in local storage
      this.storageService.set('isLoggedIn', JSON.stringify(username));
      if (!this.storageService.hasOwnProperty(username)) {
        const newPlayer: IPlayerScore = {
          maxScore: 0,
          score: 0
        }
        this.storageService.set(username, JSON.stringify(newPlayer));
      }
      this.router.navigate(['/game']);
    }

    return username;
  };

  logout() {
    this.storageService.remove('isLoggedIn');
    this.router.navigate(['/home']);
  }
}