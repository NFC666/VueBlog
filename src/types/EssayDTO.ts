export interface EssayDTO {
    id: string; // 数据库唯一 ID
    slug: string; // 文章唯一标识
    views: number; // 浏览量
    likes: number; // 点赞数
    commentsCount: number; // 评论数
    createdAt: string; // 创建时间
    updatedAt: string; // 更新时间
    excerpt: string; // 摘要
    title: string; // 标题
    content: string; // 内容
    author: string; // 作者
    coverImage?: string; // 封面图片，可选
    tags: string[]; // 标签列表
    category: string; // 分类
    isPublished: boolean; // 是否发布
    metaDescription?: string; // SEO 描述，可选
  }