import {Component, OnInit} from '@angular/core';
import {filter} from "rxjs/operators";
import {NavigationEnd, Router} from "@angular/router";
import {UserDataAccessService} from "./components/user-data-access/user-data-access.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isHide: boolean | undefined;

  constructor(private router: Router,
              private userDataAccess: UserDataAccessService) {
  }

  ngOnInit() {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)).subscribe((val: any) => {
      this.isHide = !!(val.url.includes('/home') || val.url.includes('/log-in') || val.url.includes('/sign-up'));
      this.userDataAccess.sideActive.next(val.url);
    });
  }
}
