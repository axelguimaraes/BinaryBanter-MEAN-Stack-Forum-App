import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadDetailsComponent } from './thread-details.component';

describe('ThreadDetailsComponent', () => {
  let component: ThreadDetailsComponent;
  let fixture: ComponentFixture<ThreadDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ThreadDetailsComponent]
    });
    fixture = TestBed.createComponent(ThreadDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
