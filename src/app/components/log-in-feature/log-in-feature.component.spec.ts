import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogInFeatureComponent} from './log-in-feature.component';

describe('LogInFeatureComponent', () => {
  let component: LogInFeatureComponent;
  let fixture: ComponentFixture<LogInFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInFeatureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
