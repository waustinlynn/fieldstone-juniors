import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterScoreComponent } from './enter-score.component';

describe('EnterScoreComponent', () => {
  let component: EnterScoreComponent;
  let fixture: ComponentFixture<EnterScoreComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EnterScoreComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EnterScoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
