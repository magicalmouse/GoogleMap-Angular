import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickupDialogComponent } from './pickup-dialog.component';

describe('PickupDialogComponent', () => {
  let component: PickupDialogComponent;
  let fixture: ComponentFixture<PickupDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickupDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickupDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
