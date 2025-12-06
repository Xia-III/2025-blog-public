import { notFound } from 'next/navigation'
import { loadBlog, type BlogConfig } from '@/lib/load-blog'
import { BlogPreview } from '@/components/blog-preview'
import LiquidGrass from '@/components/liquid-grass'
import { motion } from 'motion/react'
import Link from 'next/link'

// 静态生成所有可能的博客ID
export async function generateStaticParams() {
  try {
    // 在构建时获取所有博客文章的列表
    const res = await fetch(`${process.env.VERCEL_URL || 'http://localhost:2025'}/blogs/index.json`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      console.error('Failed to fetch blog index for static generation')
      return []
    }

    const blogs: Array<{ slug: string }> = await res.json()

    // 为每个博客生成一个静态参数
    return blogs.map((blog) => ({
      id: blog.slug,
    }))
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const slug = params.id

  // 服务器端获取博客数据
  let blogData: { config: BlogConfig; markdown: string; cover?: string } | null = null
  let error: string | null = null

  try {
    blogData = await loadBlog(slug)
  } catch (e: any) {
    error = e?.message || '加载失败'
  }

  if (error) {
    return <div className='flex h-full items-center justify-center text-sm text-red-500'>{error}</div>
  }

  if (!blogData) {
    notFound() // 返回 404 页面
  }

  const title = blogData.config.title ? blogData.config.title : slug
  const { format } = await import('date-fns')
  const date = blogData.config.date ? format(new Date(blogData.config.date), 'yyyy年 M月 d日') : ''
  const tags = blogData.config.tags || []

  return (
    <>
      <BlogPreview
        markdown={blogData.markdown}
        title={title}
        tags={tags}
        date={date}
        summary={blogData.config.summary}
        cover={blogData.cover ? `${origin}${blogData.cover}` : undefined}
        slug={slug}
      />

      <motion.button
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => {}}
        className='absolute top-4 right-6 rounded-xl border bg-white/60 px-6 py-2 text-sm backdrop-blur-sm transition-colors hover:bg-white/80 max-sm:hidden'>
        {/* 在静态版本中，编辑按钮链接到编辑页面 */}
        <Link href={`/write/${slug}`}>编辑</Link>
      </motion.button>

      {slug === 'liquid-grass' && <LiquidGrass />}
    </>
  )
}
