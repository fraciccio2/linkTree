import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NavbarUiComponent} from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarUiComponent;
  let fixture: ComponentFixture<NavbarUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
