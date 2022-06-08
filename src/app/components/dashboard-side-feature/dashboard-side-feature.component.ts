import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-side-feature',
  template: `
    <app-dashboard-side-ui
      [isHide]="isHide"
    ></app-dashboard-side-ui>
  `,
  styles: []
})
export class DashboardSideFeatureComponent implements OnInit {
  isHide: boolean | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((val: any) => {
      this.isHide = (val.url == '/log-in' || val.url == '/sign-up' || val.url == '/'); //TODO rivedere qui come fare
    });
  }

}
