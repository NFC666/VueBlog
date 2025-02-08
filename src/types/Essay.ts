export interface Essay {
    title: string; // 标题
    content: string; // 内容
    author: string; // 作者
    coverImage?: string; // 封面图片，可选
    tags: string[]; // 标签列表
    category: string; // 分类
    isPublished: boolean; // 是否发布
    metaDescription?: string; // SEO 描述，可选
  }