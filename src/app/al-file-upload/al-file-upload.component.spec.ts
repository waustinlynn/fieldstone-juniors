import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlFileUploadComponent } from './al-file-upload.component';

describe('AlFileUploadComponent', () => {
  let component: AlFileUploadComponent;
  let fixture: ComponentFixture<AlFileUploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlFileUploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlFileUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
