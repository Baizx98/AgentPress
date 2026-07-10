# Agent 与媒体改造（第一阶段）

本文定义不增加内容类型前提下的 Agent 读取和媒体管理约定。

## Agent 元数据

每篇公开内容拥有 `agent` frontmatter：面向机器的摘要、来源质量、可复用等级、推荐引用、关联内容与资源 ID。它不包含私密提示词、凭据、草稿链接或内部资料。

## 公开只读入口

- `/llms.txt`：站点与内容入口。
- `/llms-full.txt`：已发布内容的 Agent 摘要。
- `/api/content/index.json`：内容目录与 Agent 元数据。
- `/api/content/<slug>.json`：单篇元数据。
- `/api/content/<slug>.mdx`：原始 MDX。
- `/tags/<tag>.json`：标签索引。
- `/graph.json`：内容关系图。
- `/api/assets/index.json`：已公开媒体 manifest。

写入仍只经本地/受信 MCP 与草稿分支 PR；不开放公网写 MCP。

## 媒体 manifest

`src/data/assets.json` 是资源的 Git 可审计清单。实际文件在开发期保存于 `public/uploads/`，生产期上传腾讯云 COS，使用内容哈希作为对象键。每个资源至少记录 ID、类型、MIME、哈希、可访问性文本、许可和引用它的内容 slug。
