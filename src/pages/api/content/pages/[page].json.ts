import { publishedPosts } from '../../../../lib/content';
import { archivePageSize } from '../../../../config/content';

export async function getStaticPaths() {
  const posts = await publishedPosts();
  const pageCount = Math.ceil(posts.length / archivePageSize);
  return Array.from({ length: pageCount }, (_, index) => ({
    params: { page: String(index + 1) },
    props: { posts: posts.slice(index * archivePageSize, (index + 1) * archivePageSize) },
  }));
}

export async function GET({ props }: { props: { posts: Awaited<ReturnType<typeof publishedPosts>> } }) {
  return Response.json({
    items: props.posts.map((post) => ({
      slug: post.id,
      title: post.data.title,
      description: post.data.description,
      publishedAt: post.data.publishedAt.toISOString(),
    })),
  });
}
