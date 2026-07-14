# AgentPress 架构边界

AgentPress 是博客的数据面和展示层，只保存 Astro 应用、MDX 内容、站点配置和少量随站点发布的品牌资源。日常内容管理不在本仓库中实现。

## 事实来源

- GitHub `main`：已经审核、可供 Vercel 构建的代码和内容。
- `src/content/posts/`：文章 MDX，每篇文件同时保存 frontmatter 与正文。
- 腾讯云 COS：文章图片、论文附件等媒体二进制的唯一生产后端。
- AgentPress Control：草稿、媒体元数据、上传、Git worktree、Pull Request 和 MCP 的唯一控制面。

文章通过 `cover`、Markdown 图片或 `<Figure>` 中的稳定 CDN URL 引用媒体。仓库不再维护 `assets.json`；媒体检索、归档和引用扫描由 Control 完成，避免两套清单发生漂移。

## 发布流程

1. Web、云端 Agent 或 ChatGPT 通过 Control 创建持久草稿。
2. Control 将每份草稿保存在独立 Git worktree 中。
3. 媒体只通过 Control 上传至 COS，MDX 只保存 `https://media.baizx.cool/...` 引用。
4. Control 校验 frontmatter 与 MDX，推送草稿分支并创建 Pull Request。
5. 人工审核并合并到 `main`。
6. Vercel 自动构建并发布 `https://blog.baizx.cool`。

Control 不直接推送 `main`，AgentPress 也不保存 Control 的令牌、COS 密钥、登录会话或媒体数据库。

## 公开读取

站点保留面向浏览器、搜索引擎和 Agent 的只读入口：

- `/llms.txt` 与 `/llms-full.txt`
- `/api/content/index.json`
- `/api/content/<slug>.json`
- `/api/content/<slug>.mdx`
- `/tags/<tag>.json`
- `/graph.json`
- `/feed.xml`

写入接口只存在于独立部署的 AgentPress Control，并要求认证。
