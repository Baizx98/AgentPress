import { getCollection } from 'astro:content';

export const publishedPosts = async () =>
  (await getCollection('posts', ({ data }) => !data.draft)).sort(
    (a, b) => b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf(),
  );

export const formatDate = (date: Date) =>
  new Intl.DateTimeFormat('zh-CN', { dateStyle: 'medium' }).format(date);

export const getReadingStats = (markdown: string) => {
  const cjkCharacters = (markdown.match(/[\u3400-\u9fff]/g) ?? []).length;
  const latinWords = (markdown.match(/[A-Za-z0-9][A-Za-z0-9_-]*/g) ?? []).length;
  const count = cjkCharacters + latinWords;
  return { count, minutes: Math.max(1, Math.ceil(count / 400)) };
};
