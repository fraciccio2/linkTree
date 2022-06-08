import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SignUpUiComponent} from './sign-up-ui.component';

describe('SignUpUiComponent', () => {
  let component: SignUpUiComponent;
  let fixture: ComponentFixture<SignUpUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SignUpUiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SignUpUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
