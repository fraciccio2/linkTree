import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DashboardSideFeatureComponent} from './dashboard-side-feature.component';

describe('DashboardSideFeatureComponent', () => {
  let component: DashboardSideFeatureComponent;
  let fixture: ComponentFixture<DashboardSideFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DashboardSideFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardSideFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
