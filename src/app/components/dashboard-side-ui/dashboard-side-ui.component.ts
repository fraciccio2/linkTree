import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard-side-ui',
  templateUrl: './dashboard-side-ui.component.html',
  styleUrls: ['./dashboard-side-ui.component.css']
})
export class DashboardSideUiComponent implements OnInit {
  @Input() isHide: boolean | undefined;

  constructor() { }

  ngOnInit(): void {
  }

}
