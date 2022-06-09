import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-dashboard-side-ui',
  templateUrl: './dashboard-side-ui.component.html',
  styleUrls: ['./dashboard-side-ui.component.css']
})
export class DashboardSideUiComponent {
  @Input() isHide: boolean | undefined;
  @Input() nickname: string | null = null;
  @Input() userImage: string | undefined;
  @Output() signOut = new EventEmitter<void>();
  @Output() changeUsername = new EventEmitter<void>();
  @Output() changeImage = new EventEmitter<void>();

}
