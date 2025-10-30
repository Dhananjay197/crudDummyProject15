import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class IdleTimeoutServiceService {
  private sessionExpired = false;

  constructor(private router: Router, private ngZone: NgZone) {}

  startTimer() {
    // 2 minute ka timer
    setTimeout(() => {
      this.sessionExpired = true;
      this.setupActivityListener();
    }, 2 * 60 * 1000); // 2 min
  }

  private setupActivityListener() {
    ['mousemove', 'mouseover', 'keypress'].forEach(event => {
      window.addEventListener(event, () => {
        if (this.sessionExpired) {
          this.logout();
        }
      });
    });
  }

  private logout() {
    sessionStorage.clear();
  //  this.snackBar.open('Session expired after 2 minutes. Please login again.', 'OK', {
  //     duration: 4000,   // 4 sec me auto close
  //     verticalPosition: 'top'
  //   });
    this.router.navigate(['/login']);
  }
}

