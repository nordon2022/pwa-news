export interface Article {
  title: string;
  imageUrl: string;
  comments: string[];
  pubDate?: Date; // добавляем дату публикации
}
