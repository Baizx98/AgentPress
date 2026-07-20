import { publishedPosts } from '../../../lib/content';

export async function GET({ site }: { site: URL }) {
  const posts = await publishedPosts();
  const payload = posts.map((post) => ({
    slug: post.id,
    title: post.data.title,
    description: post.data.description,
    type: post.data.type,
    tags: post.data.tags,
    author: post.data.author,
    language: post.data.language,
    cover: post.data.cover,
    canonicalUrl: post.data.canonicalUrl,
    sourceKey: post.data.sourceKey,
    agent: post.data.agent,
    publishedAt: post.data.publishedAt.toISOString(),
    updatedAt: post.data.updatedAt?.toISOString(),
    htmlPath: `/posts/${post.id}/`,
    htmlUrl: new URL(`/posts/${post.id}/`, site).toString(),
    mdxUrl: new URL(`/api/content/${post.id}.mdx`, site).toString(),
  }));
  return Response.json({ version: 'v1', items: payload });
}
