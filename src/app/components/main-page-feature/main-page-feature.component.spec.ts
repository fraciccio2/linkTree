import {ComponentFixture, TestBed} from '@angular/core/testing';

import {MainPageFeatureComponent} from './main-page-feature.component';

describe('MainPageFeatureComponent', () => {
  let component: MainPageFeatureComponent;
  let fixture: ComponentFixture<MainPageFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MainPageFeatureComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MainPageFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
