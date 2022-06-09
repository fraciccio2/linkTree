import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ChangeImageModalComponent} from './change-image-modal.component';

describe('ChangeImageModalComponent', () => {
  let component: ChangeImageModalComponent;
  let fixture: ComponentFixture<ChangeImageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChangeImageModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeImageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
