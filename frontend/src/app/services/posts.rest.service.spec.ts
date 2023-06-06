import { TestBed } from '@angular/core/testing';

import { PostsRestService } from './posts.rest.service';

describe('PostsRestService', () => {
  let service: PostsRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostsRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
