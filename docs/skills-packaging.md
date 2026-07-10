# Agent Skills 打包与存储设计

Skills 是供 Agent 使用的可复用工件，而不是个人能力标签。一个 Skill 可以包含说明文档、提示词、脚本、代码、模板、测试样例及其他文件。

## 仓库内的事实来源

```text
src/content/skills/<slug>/
├─ index.md                 # 站点展示元数据与介绍
├─ SKILL.md                 # Agent 可读取的主说明
├─ scripts/                 # 可选：脚本或代码
├─ assets/                  # 可选：模板、示例与静态资源
└─ tests/                   # 可选：验证样例
```

Git 仓库保存完整、可审计的 Skill 源码。生产构建时，CI 将每个目录打包为 ZIP/TAR.GZ，计算 SHA-256，并上传到腾讯云 COS；站点和公开 API 只展示版本、摘要、许可、校验值与 COS 下载链接。

开发期可将生成包放入 `public/downloads/` 以验证流程。不要把密钥、私有数据或未经审计的可执行文件置入公开 Skill。

## 发布流程

1. 在 `content/draft-*` 分支新增或更新 Skill。
2. CI 执行 schema、文件白名单、secret 扫描和可选测试。
3. PR 审核通过并合并至 `main` 后，CI 打包并发布到 COS。
4. CI 回写或生成版本清单，公开页面与 Agent API 使用该清单。

