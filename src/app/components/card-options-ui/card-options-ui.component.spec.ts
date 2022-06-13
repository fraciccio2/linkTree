import {ComponentFixture, TestBed} from '@angular/core/testing';

import {CardOptionsUiComponent} from './card-options-ui.component';

describe('CardOptionsUiComponent', () => {
  let component: CardOptionsUiComponent;
  let fixture: ComponentFixture<CardOptionsUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardOptionsUiComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardOptionsUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
