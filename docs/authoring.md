# AgentPress 内容编写

每篇内容都保存在 `src/content/posts/`，以 MDX 作为正文格式。前置元数据由 `src/content.config.ts` 校验；卡片、封面和不同内容类型的展示规则由 `src/config/content.ts` 集中控制。

## 已启用的 Markdown 能力

- 标准 Markdown、表格、任务列表、脚注与 MDX 组件。
- `astro-expressive-code` 代码块：高亮、行号、文件名与复制按钮。
- `$...$` 和 `$$...$$` 数学公式（KaTeX）。
- 可复用提示框、图注和 Mermaid 图表组件。

在 MDX 文件顶部按相对路径导入组件：

```mdx
import Callout from '../../components/Callout.astro';
import Figure from '../../components/Figure.astro';
import Mermaid from '../../components/Mermaid.astro';

<Callout kind="tip" title="实践建议">
  保持结论、依据和可复现实验之间可追溯。
</Callout>

<Mermaid chart={`flowchart LR\n  A[Source] --> B[Insight] --> C[Post]`} />

<Figure src="/uploads/example.png" alt="示意图" caption="图片来源与说明。" />
```

Mermaid 在浏览器端渲染，静态 HTML 中仍保留图表源码，便于阅读器与 Agent 获取。大型媒体先放入 `public/uploads/`；迁移腾讯云 COS 后仅需把同一资源路径映射到 CDN 域名。

## 写作与展示规则

- `cover` 会成为文章页页首封面；Paper、Report 和 Blog 的列表卡片也会在右侧使用它。
- `paper` 请补充题目、作者、单位、会议信息与 `paperUrl`；`technical-report` 可补充 `repository`、`demoUrl` 与重点摘要。
- `note` 使用紧凑卡片，避免被视觉装饰掩盖；`blog` 可选择 `daily-brief` 或 `general` 系列。
- 文章页自动计算字数和预估阅读时间，并从二至四级标题生成右侧可展开目录。

## 可配置位置

- 站点名称、导航、个人资料、评论占位：`src/config/site.ts`
- 内容类型标签、卡片模式、封面规则：`src/config/content.ts`
- Dock 的配色方案清单：`src/config/theme.ts`
- 语法、数学、代码高亮插件：`astro.config.mjs`
