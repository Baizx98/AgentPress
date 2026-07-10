# AgentPress

AgentPress — “今夜白的知识宫殿”，一个基于 Astro 与 MDX 构建的 Agent-native 个人知识中心。

## Status

This repository contains the initial scaffold and an implementation design in [docs/design.md](docs/design.md). Product development starts after the design is approved.

## Local development

Requires Node.js 22+ and pnpm 11+.

```powershell
pnpm install
pnpm dev
```

## Planned areas

- `src/content/`: MDX content and content collections
- `src/pages/`: public routes and machine-readable endpoints
- `src/components/`: presentation components
- `packages/cli/`: article-management CLI
- `packages/mcp-server/`: MCP server for agent operations
- `infra/`: Tencent Cloud deployment and OAuth gateway configuration
- `docs/`: product and technical decisions
