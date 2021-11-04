import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '@app/services/auth/auth.service';
import { StorageService } from '@app/services/storage/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private fb: FormBuilder,
  ) {
    this.storageService.remove('isLoggedIn');
  }

  ngOnInit(): void {
  }

  userForm = this.fb.group({
    username: ['', Validators.pattern('^[A-Za-z0]+$')],
  });

  onSubmit(): void {

    if (this.userForm.valid) {
      try {
        const username = this.userForm.get('username')?.value;
        this.authService.login(username);
      } catch (err) {
        console.error(err);
      }
    }
  }

}
