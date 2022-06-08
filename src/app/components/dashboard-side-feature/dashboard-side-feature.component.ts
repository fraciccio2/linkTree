import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-dashboard-side-feature',
  template: `
    <app-dashboard-side-ui
      [isHide]="false"
    ></app-dashboard-side-ui>
  `,
  styles: []
})
export class DashboardSideFeatureComponent implements OnInit {
  isHide: boolean | undefined;

  constructor(private router: Router) {
  }

  ngOnInit(): void {
    this.router.events.subscribe((val) =>{
      debugger
    });
  }

}
