import { Injectable } from '@angular/core';
import { Article } from './article';
import { firstValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { XMLParser } from 'fast-xml-parser';

@Injectable({
  providedIn: 'root',
})
export class NewsService {
  constructor(private http: HttpClient) {}

  private articles: Article[] = [
    {
      title: 'Article 1',
      imageUrl: '/assets/maxresdefault2.jpeg',
      comments: [
        'Article 1 Comment 1',
        'Article 1 Comment 2',
        'Article 1 Comment 3',
      ],
    },
    {
      title: 'Article 2',
      imageUrl: '/assets/images.jpeg',
      comments: [
        'Article 2 Comment 1',
        'Article 2 Comment 2',
        'Article 2 Comment 3',
      ],
    },
    {
      title: 'Article 3',
      imageUrl: '/assets/dog.jpeg',
      comments: [
        'Article 3 Comment 1',
        'Article 3 Comment 2',
        'Article 3 Comment 3',
      ],
    },
    // Add more articles as needed
  ];

  getArticles(): Article[] {
    // Simulate fetching articles from an API
    return this.articles;
  }

  fetchRss(originalUrl: string): Promise<Article[]> {
    const rssUrl = `/rss?url=${encodeURIComponent(originalUrl)}`;

    return firstValueFrom(this.http.get(rssUrl)).then((json: any) => {
      const items = json.rss.channel.item || [];
      return items
        .map((item: any) => ({
          title: item.title,
          imageUrl:
            item.enclosure?.['@_url'] || item['media:content']?.['@_url']
              ? '/img-proxy?url=' +
                encodeURIComponent(
                  item.enclosure?.['@_url'] ||
                    item['media:content']?.['@_url'] ||
                    ''
                )
              : '/assets/images.jpeg',
          comments: [],
          pubDate: item.pubDate ? new Date(item.pubDate) : undefined,
        }))
        .slice(0, 20);
    });
  }
}
