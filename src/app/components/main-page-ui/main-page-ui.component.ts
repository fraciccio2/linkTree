import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {ButtonCollectorModel, CollectorModel} from "../../utils";
import {MatMenuTrigger} from "@angular/material/menu";
import {FormControl} from '@angular/forms';
import {CdkDragDrop} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-main-page-ui',
  templateUrl: './main-page-ui.component.html',
  styleUrls: ['./main-page-ui.component.css']
})
export class MainPageUiComponent {
  @Input() collectors: CollectorModel[] | undefined;
  @Input() buttonSelected!: FormControl;
  @Output() deleteCollector = new EventEmitter<string | null>();
  @Output() deleteButton = new EventEmitter<void>();
  @Output() modifyButton = new EventEmitter<void>();
  @Output() drop = new EventEmitter<CdkDragDrop<{ key: string, value: ButtonCollectorModel }[]>>();
  @ViewChild(MatMenuTrigger) matMenuTrigger!: MatMenuTrigger;

  menuTopLeftPosition = {x: 0, y: 0};


  onRightClick(event: MouseEvent) {
    event.preventDefault();
    this.menuTopLeftPosition.y = event.clientY;
    this.menuTopLeftPosition.x = event.clientX;
    this.matMenuTrigger.openMenu();
  }

}
