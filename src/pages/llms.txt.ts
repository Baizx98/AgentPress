import { publishedPosts } from '../lib/content';

export async function GET({ site }: { site: URL }) {
  const posts = await publishedPosts();
  const lines = ['# 今夜白的知识宫殿', '', '> 白卓新的个人知识中心。公开内容可供 Agent 读取；管理操作需授权。', '', '## Published content', ''];
  for (const post of posts) lines.push(`- [${post.data.title}](${new URL(`/posts/${post.id}/`, site)}) — ${post.data.description}`);
  return new Response(lines.join('\n'), { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
}
