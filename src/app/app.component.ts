import { Component } from '@angular/core';
import { NewsComponent } from './news/news.component';
import { CheckForUpdateService } from './check-for-update.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NewsComponent, HttpClientModule],
  providers: [CheckForUpdateService, NewsService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'news-app';
  constructor(public checkForUpdateService: CheckForUpdateService) {}
}
