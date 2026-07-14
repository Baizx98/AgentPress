# AgentPress

“今夜白的知识宫殿”的 Astro + MDX 数据面和展示层，生产站点为 [blog.baizx.cool](https://blog.baizx.cool)。

## 仓库职责

本仓库只包含：

- Astro 页面、布局、组件和样式；
- `src/content/posts/` 中的 MDX 内容；
- SEO、RSS、Sitemap 与面向 Agent 的公开只读接口；
- 随站点发布的 Logo、头像、首页背景等固定资源。

文章创建、草稿编辑、媒体上传、COS 元数据、Git worktree、MCP 与 Pull Request 由独立的 `Baizx98/AgentPress-Control` 负责。完整边界见 [docs/architecture.md](docs/architecture.md)。

## 本地预览

需要 Node.js 24 和 pnpm 11：

```powershell
pnpm install
pnpm dev
```

构建检查：

```powershell
pnpm check
pnpm build
```

## 内容约定

文章类型为 `paper`、`technical-report`、`note` 和 `blog`。frontmatter 结构由 `src/content.config.ts` 校验，详细写法与可用 MDX 组件见 [docs/authoring.md](docs/authoring.md)。

生产文章媒体必须先经 AgentPress Control 上传至腾讯云 COS，再使用 `https://media.baizx.cool/...` URL 引用。仓库不维护第二份媒体 manifest。
