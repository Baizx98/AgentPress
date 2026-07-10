import { getCollection } from 'astro:content';

export const publishedPosts = async () =>
  (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium' }).format(date);
