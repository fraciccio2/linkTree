import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardSideUiComponent} from './dashboard-side-ui.component';

describe('DashboardSideUiComponent', () => {
  let component: DashboardSideUiComponent;
  let fixture: ComponentFixture<DashboardSideUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSideUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSideUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
