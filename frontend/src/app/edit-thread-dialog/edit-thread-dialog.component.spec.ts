import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditThreadDialogComponent } from './edit-thread-dialog.component';

describe('EditThreadDialogComponent', () => {
  let component: EditThreadDialogComponent;
  let fixture: ComponentFixture<EditThreadDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditThreadDialogComponent]
    });
    fixture = TestBed.createComponent(EditThreadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
