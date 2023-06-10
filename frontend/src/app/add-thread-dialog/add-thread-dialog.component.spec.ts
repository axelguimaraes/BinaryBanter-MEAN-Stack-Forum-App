import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddThreadDialogComponent } from './add-thread-dialog.component';

describe('AddThreadDialogComponent', () => {
  let component: AddThreadDialogComponent;
  let fixture: ComponentFixture<AddThreadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddThreadDialogComponent]
    });
    fixture = TestBed.createComponent(AddThreadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
