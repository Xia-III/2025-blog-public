import { NextConfig } from 'next'
import { codeInspectorPlugin } from 'code-inspector-plugin'

const nextConfig: NextConfig = {
	output: 'export', // 静态导出，用于 GitHub Pages
	devIndicators: false,
	reactStrictMode: false,
	reactCompiler: true,
	pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
	typescript: {
		ignoreBuildErrors: true
	},
	experimental: {
		scrollRestoration: false
	},
	// 为静态导出添加导出路径配置
	// 用于指定哪些动态路径需要静态生成
	// 但要注意，这需要在页面中实现 generateStaticParams 函数
	trailingSlash: true, // 添加尾斜杠，适用于 GitHub Pages
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js'
			}
			// ...codeInspectorPlugin({
			// 	bundler: 'turbopack'
			// })
		},

		resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.mjs', '.json', 'css']
	},
	// 如果需要部署到子目录，可以设置 basePath
	// basePath: '/your-repo-name',
	webpack: config => {
		config.module.rules.push({
			test: /\.svg$/i,
			use: [{ loader: '@svgr/webpack', options: { svgo: false } }]
		})

		return config
	},

	// 对于静态导出，重定向需要在 GitHub Pages 级别处理，而不是在 Next.js 中
	// async redirects() {
	// 	return [
	// 		{
	// 			source: '/zh',
	// 			destination: '/',
	// 			permanent: true
	// 		},
	// 		{
	// 			source: '/en',
	// 			destination: '/',
	// 			permanent: true
	// 		}
	// 	]
	// }
}

export default nextConfig
