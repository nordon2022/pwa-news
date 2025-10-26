import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsService } from '../news.service';
import { ArticleComponent } from '../article/article.component';
import { Article } from '../article';

@Component({
  selector: 'app-news',
  standalone: true,
  imports: [CommonModule, ArticleComponent],
  templateUrl: './news.component.html',
  styleUrl: './news.component.scss',
})
export class NewsComponent implements OnInit {
  articles: Article[] = [];

  constructor(private newsService: NewsService) {}

  ngOnInit(): void {
    // this.articles = this.newsService.getArticles();
    this.newsService
      .fetchRss('https://ria.ru/export/rss2/archive/index.xml')
      .then((rssArticles) => {
        this.articles = rssArticles;
      })
      .catch((err) => console.error(err));
  }
}
