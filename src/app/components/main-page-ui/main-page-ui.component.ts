import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {CollectorModel} from "../../utils";
import {MatMenuTrigger} from "@angular/material/menu";

@Component({
  selector: 'app-main-page-ui',
  templateUrl: './main-page-ui.component.html',
  styleUrls: ['./main-page-ui.component.css']
})
export class MainPageUiComponent {
  @Input() collectors: CollectorModel[] | undefined;
  @Output() deleteCollector = new EventEmitter<string | null>();
  @Output() deleteButton = new EventEmitter<void>();
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  menuTopLeftPosition = {x: 0, y: 0};

  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.menuTopLeftPosition.y = event.clientY;
    this.menuTopLeftPosition.x = event.clientX;
    this.matMenuTrigger.openMenu();
  }

}
