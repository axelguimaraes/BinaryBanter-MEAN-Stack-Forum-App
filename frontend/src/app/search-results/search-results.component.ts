import { Component } from '@angular/core';
import { Post } from '../models/post.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {
  posts: Post[] = [];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    const state = this.router.getCurrentNavigation()?.extras.state;
    if (state && state['posts']) {
      this.posts = state['posts'];
      this.transformTagFormats();
    }
    console.log(this.posts)
  }

  goBack() {
    this.router.navigate(['../']);
  }

  goToThread(threadId: string) {
    this.router.navigate(['/thread', threadId]);
  }

  private transformTagFormats() {
    this.posts.forEach(post => {
      post.tags = post.tags.map(tag => this.transformTagFormat(tag));
    });
  }

  private transformTagFormat(tag: string): string {
    const words = tag.split('_');
    const capitalizedWords = words.map(word => this.capitalizeFirstLetter(word));
    return capitalizedWords.join(' ');
  }

  private capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
  }
}
