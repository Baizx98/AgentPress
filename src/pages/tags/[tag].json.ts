import { publishedPosts } from '../../lib/content';

export async function getStaticPaths() {
  const posts = await publishedPosts();
  const tags = new Set(posts.flatMap((post) => post.data.tags));
  return [...tags].map((tag) => ({ params: { tag }, props: { tag } }));
}

export async function GET({ props, site }: { props: { tag: string }; site: URL }) {
  const posts = (await publishedPosts()).filter((post) => post.data.tags.includes(props.tag));
  return Response.json({
    version: 'v1',
    tag: props.tag,
    items: posts.map((post) => ({
      slug: post.id,
      title: post.data.title,
      type: post.data.type,
      description: post.data.description,
      url: new URL(`/posts/${post.id}/`, site).toString(),
    })),
  });
}
