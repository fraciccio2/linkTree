import {ComponentFixture, TestBed} from '@angular/core/testing';

import {LogInUiComponent} from './log-in-ui.component';

describe('LogInUiComponent', () => {
  let component: LogInUiComponent;
  let fixture: ComponentFixture<LogInUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
