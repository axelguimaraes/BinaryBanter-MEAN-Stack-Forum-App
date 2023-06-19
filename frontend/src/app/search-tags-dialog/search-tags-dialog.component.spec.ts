import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTagsDialogComponent } from './search-tags-dialog.component';

describe('SearchTagsDialogComponent', () => {
  let component: SearchTagsDialogComponent;
  let fixture: ComponentFixture<SearchTagsDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchTagsDialogComponent]
    });
    fixture = TestBed.createComponent(SearchTagsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
