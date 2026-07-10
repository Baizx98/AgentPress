import { publishedPosts } from '../lib/content';

export async function GET({ site }: { site: URL }) {
  const posts = await publishedPosts();
  const sections = posts.map((post) => [
    `## ${post.data.title}`,
    post.data.agent.summary ?? post.data.description,
    `- Type: ${post.data.type}`,
    `- URL: ${new URL(`/posts/${post.id}/`, site)}`,
    `- Markdown: ${new URL(`/api/content/${post.id}.mdx`, site)}`,
    `- Source quality: ${post.data.agent.sourceQuality}`,
    `- Reuse level: ${post.data.agent.reuseLevel}`,
  ].join('\n'));
  return new Response(['# 今夜白的知识宫殿', '', '> 已发布内容的 Agent-readable 摘要索引。', '', ...sections].join('\n\n'), {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
}
