import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/services/auth/auth.service';
import { StorageService } from '@app/services/storage/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  public currentUser: string|null = '';

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    if (this.storageService.hasOwnProperty('isLoggedIn')) {
      const current: string = JSON.parse(this.storageService.get('isLoggedIn'));
      this.currentUser = current;
    }
  }

  public logout = () => {
    this.authService.logout();
  }

}
