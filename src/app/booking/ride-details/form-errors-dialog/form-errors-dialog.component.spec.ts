import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormErrorsDialogComponent } from './form-errors-dialog.component';

describe('FormErrorsDialogComponent', () => {
  let component: FormErrorsDialogComponent;
  let fixture: ComponentFixture<FormErrorsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormErrorsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormErrorsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
