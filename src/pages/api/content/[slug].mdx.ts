import { getCollection } from 'astro:content';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export async function getStaticPaths() {
  const posts = await getCollection('posts', ({ data }) => !data.draft);
  return posts.map((post) => ({ params: { slug: post.id }, props: { post } }));
}

export async function GET({ props }: { props: { post: Awaited<ReturnType<typeof getCollection<'posts'>>>[number] } }) {
  if (!props.post.filePath) throw new Error(`Missing source path for ${props.post.id}`);
  const source = await readFile(resolve(props.post.filePath), 'utf8');
  return new Response(source, {
    headers: { 'Content-Type': 'text/markdown; charset=utf-8' },
  });
}
