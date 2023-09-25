import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideQuestionAnswerConfirmationComponent } from './ride-question-answer-confirmation.component';

describe('RideQuestionAnswerConfirmationComponent', () => {
  let component: RideQuestionAnswerConfirmationComponent;
  let fixture: ComponentFixture<RideQuestionAnswerConfirmationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RideQuestionAnswerConfirmationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RideQuestionAnswerConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
