# 2025 Blog 项目说明

## 项目概述

2025 Blog 是一个基于 Next.js 的静态博客项目，使用 GitHub App 管理项目内容。该项目允许用户通过前端界面直接编辑和管理博客内容，内容存储在 GitHub 仓库中。项目使用 TypeScript、Tailwind CSS 和多种现代前端技术构建。

## 项目结构

```
2025-blog-public/
├── public/           # 静态资源目录
│   ├── favicon.png
│   ├── manifest.json
│   ├── blogs/        # 博客内容
│   └── images/       # 图片资源
├── scripts/          # 构建脚本
│   └── gen-svgs-index.js  # 生成 SVG 索引文件
├── src/              # 源代码目录
│   ├── app/          # Next.js 13+ App Router 页面
│   ├── components/   # React 组件
│   ├── config/       # 配置文件
│   ├── hooks/        # React 自定义 Hook
│   ├── layout/       # 布局组件
│   ├── lib/          # 工具函数库
│   ├── styles/       # 样式文件
│   ├── svgs/         # SVG 图标文件
│   └── consts.ts     # 常量定义
├── .gitattributes
├── .gitignore
├── .prettierignore
├── .prettierrc
├── global.d.ts
├── LICENSE
├── next.config.ts    # Next.js 配置
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── README.md
├── tsconfig.json     # TypeScript 配置
└── QWEN.md           # 当前文件
```

## 技术栈

- **框架**: Next.js 16 (使用 App Router)
- **语言**: TypeScript
- **样式**: Tailwind CSS
- **包管理**: pnpm
- **编译器**: React Compiler (实验性)
- **动画**: Framer Motion
- **状态管理**: Zustand
- **代码高亮**: Shiki
- **SVG 处理**: @svgr/webpack

## 构建和运行

### 安装依赖

```bash
pnpm install
```

### 开发环境

```bash
pnpm dev
```
此命令将在端口 2025 上启动开发服务器，并使用 TurboPack 加速构建。

### 构建生产包

```bash
pnpm build
```
此命令将使用 TurboPack 构建生产版本。

### 运行生产服务器

```bash
pnpm start
```

### 代码格式化

```bash
pnpm format
```
使用 Prettier 格式化项目中的代码文件。

### SVG 生成

```bash
pnpm svg
```
运行此命令将生成 SVG 图标的索引文件，位于 `src/svgs/index.ts`。

## 配置

### GitHub 集成

项目通过环境变量配置 GitHub App 集成：

```ts
export const GITHUB_CONFIG = {
	OWNER: process.env.NEXT_PUBLIC_GITHUB_OWNER || 'yysuni',
	REPO: process.env.NEXT_PUBLIC_GITHUB_REPO || '2025-blog-public',
	BRANCH: process.env.NEXT_PUBLIC_GITHUB_BRANCH || 'main',
	APP_ID: process.env.NEXT_PUBLIC_GITHUB_APP_ID || '-'
} as const
```

### 环境变量

- `NEXT_PUBLIC_GITHUB_OWNER`: GitHub 仓库所有者
- `NEXT_PUBLIC_GITHUB_REPO`: GitHub 仓库名称
- `NEXT_PUBLIC_GITHUB_BRANCH`: GitHub 仓库分支 (默认: 'main')
- `NEXT_PUBLIC_GITHUB_APP_ID`: GitHub App ID

## 开发约定

- 使用 TypeScript 进行类型安全开发
- 使用 Tailwind CSS 进行样式开发
- 使用 Prettier 统一代码格式
- 使用 React Compiler 提高性能
- 代码路径别名: `@/*` 指向 `./src/*`

## 部署

项目适合部署在 Vercel 等支持 Next.js 的平台上。部署时需要设置相应的环境变量以连接到 GitHub App。