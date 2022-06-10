import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddNewLinkPageUiComponent} from './add-new-link-page-ui.component';

describe('AddNewLinkPageUiComponent', () => {
  let component: AddNewLinkPageUiComponent;
  let fixture: ComponentFixture<AddNewLinkPageUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewLinkPageUiComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLinkPageUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
