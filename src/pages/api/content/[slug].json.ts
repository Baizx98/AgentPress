import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props, site }: { props: { post: Awaited<ReturnType<typeof getCollection<'posts'>>>[number] }; site: URL }) {
  const { post } = props;
  return Response.json({
    version: 'v1',
    slug: post.id,
    metadata: post.data,
    htmlUrl: new URL(`/posts/${post.id}/`, site).toString(),
    mdxUrl: new URL(`/api/content/${post.id}.mdx`, site).toString(),
  });
}
