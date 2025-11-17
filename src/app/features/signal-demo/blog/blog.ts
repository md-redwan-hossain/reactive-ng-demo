import { httpResource } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal, viewChildren } from '@angular/core';
import { z } from 'zod';
import { Card } from '../card/card';
const BlogPostModel = z.object({
  title: z.string(),
  body: z.string(),
});

type BlogPost = z.infer<typeof BlogPostModel>;

@Component({
  selector: 'app-blog',
  imports: [Card],
  templateUrl: './blog.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Blog {
  readonly notifer = signal<null | number>(null);
  readonly componentFromView = viewChildren<Card>('card');

  readonly dataFromApi = httpResource<BlogPost[]>(
    () => {
      if (!this.notifer()) {
        return undefined;
      }
      return {
        url: 'https://jsonplaceholder.typicode.com/posts/?_limit=1',
      };
    },
    {
      parse: (rawData) => {
        return BlogPostModel.array().parse(rawData);
      },
    },
  );

  updateColorInChild() {
    this.componentFromView().map((elem) => {
      elem.makeHeadingRed();
    });
  }

  loadTodoData() {
    this.notifer.update((current) => {
      return current === null ? 1 : current + 1;
    });
  }
}
