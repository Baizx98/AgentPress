import rss from '@astrojs/rss';
import { publishedPosts } from '../lib/content';

export async function GET(context: { site: URL }) {
  const posts = await publishedPosts();
  return rss({
    title: '今夜白的知识宫殿',
    description: '白卓新的个人知识中心',
    site: context.site,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.publishedAt,
      link: `/posts/${post.id}/`,
    })),
  });
}
