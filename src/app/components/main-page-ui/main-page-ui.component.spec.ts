import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPageUiComponent} from './main-page-ui.component';

describe('MainPageUiComponent', () => {
  let component: MainPageUiComponent;
  let fixture: ComponentFixture<MainPageUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPageUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
