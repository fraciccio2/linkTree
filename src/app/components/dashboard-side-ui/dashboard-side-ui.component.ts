import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DashboardItemModel} from "../../utils";

@Component({
  selector: 'app-dashboard-side-ui',
  templateUrl: './dashboard-side-ui.component.html',
  styleUrls: ['./dashboard-side-ui.component.css']
})
export class DashboardSideUiComponent {
  @Input() nickname: string | null = null;
  @Input() userImage: string | null = null;
  @Input() dashboardItems: DashboardItemModel[] | undefined;
  @Input() sideActive: string | undefined | null;
  @Output() signOut = new EventEmitter<void>();
  @Output() changeUsername = new EventEmitter<void>();
  @Output() changeImage = new EventEmitter<void>();
  @Output() removeImage = new EventEmitter<void>();

}
