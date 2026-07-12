export const siteConfig = {
  name: '今夜白的知识宫殿',
  shortName: '今夜白',
  description: '面向大模型推理系统优化的个人知识中心。',
  contentWidth: '56rem',
  author: {
    title: '面向大模型推理系统优化的研究者',
    description: '关注 LLM 推理加速、KV Cache、Agent Memory，以及长上下文和高吞吐推理系统。',
    avatar: 'https://www.gravatar.com/avatar/47e7a8c0a89c355f876c740c4810565e?s=256&d=identicon',
    topics: ['LLM Inference', 'KV Cache', 'Agent Memory', 'Systems'],
    social: [
      { label: 'GitHub', href: 'https://github.com/baizx', icon: 'github' },
      { label: 'Email', href: 'mailto:baizx98@foxmail.com', icon: 'mail' },
      { label: 'Academic Home', href: 'https://home.baizx.cool/', icon: 'home' },
      { label: 'ORCID', href: 'https://orcid.org/0009-0005-5135-5594', icon: 'orcid' },
    ],
  },
  navigation: [
    { label: '文章', href: '/posts/' },
    { label: '归档', href: '/archive/' },
    { label: '关于', href: '/about/' },
  ],
  comments: {
    enabled: true,
    provider: 'giscus' as const,
    giscus: {
      repo: 'Baizx98/agentpress-comments',
      repoId: 'R_kgDOTUhmAw',
      category: 'Announcements',
      categoryId: 'DIC_kwDOTUhmA84DA56-',
      mapping: 'pathname',
    },
  },
  filings: {
    publicSecurity: {
      label: '渝公网安备50010602503738',
      href: 'https://beian.mps.gov.cn/#/query/webSearch?code=50010602503738',
    },
    icp: {
      label: '晋ICP备2023022787号-1',
      href: 'https://beian.miit.gov.cn/',
    },
  },
  analytics: { enabled: false },
} as const;
