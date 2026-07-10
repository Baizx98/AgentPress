import { publishedPosts } from '../lib/content';

export async function GET({ site }: { site: URL }) {
  const posts = await publishedPosts();
  const postIds = new Set(posts.map((post) => post.id));
  return Response.json({
    version: 'v1',
    nodes: posts.map((post) => ({
      id: post.id,
      title: post.data.title,
      type: post.data.type,
      url: new URL(`/posts/${post.id}/`, site).toString(),
    })),
    edges: posts.flatMap((post) =>
      post.data.agent.related
        .filter((target) => postIds.has(target))
        .map((target) => ({ from: post.id, to: target, type: 'related' })),
    ),
  });
}
