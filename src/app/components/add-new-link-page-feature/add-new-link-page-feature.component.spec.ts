import {ComponentFixture, TestBed} from '@angular/core/testing';

import {AddNewLinkPageFeatureComponent} from './add-new-link-page-feature.component';

describe('AddNewLinkPageFeatureComponent', () => {
  let component: AddNewLinkPageFeatureComponent;
  let fixture: ComponentFixture<AddNewLinkPageFeatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddNewLinkPageFeatureComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddNewLinkPageFeatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
