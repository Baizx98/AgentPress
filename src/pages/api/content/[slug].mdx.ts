import { getCollection } from 'astro:content';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props }: { props: { post: Awaited<ReturnType<typeof getCollection<'posts'>>>[number] } }) {
  return new Response(props.post.body, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
