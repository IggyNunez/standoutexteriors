import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogPostPage from "@/components/sections/BlogPostPage";
import {
  ArticleJsonLd,
  BreadcrumbJsonLd,
  FaqJsonLd,
} from "@/components/seo/JsonLd";
import { SITE_URL } from "@/lib/constants";
import { BLOG_SLUGS, getBlogPost } from "@/lib/blog-posts";

interface RouteParams {
  params: Promise<{ slug: string }>;
}

/** Statically pre-render every /blog/[slug] route at build time. */
export function generateStaticParams() {
  return BLOG_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) return { title: "Post not found" };

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: { absolute: post.title },
    description: post.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      url,
      title: post.title,
      description: post.metaDescription,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt ?? post.publishedAt,
      images: [
        {
          url: post.heroImage,
          width: 1600,
          height: 1200,
          alt: post.heroImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.metaDescription,
      images: [post.heroImage],
    },
  };
}

export default async function Page({ params }: RouteParams) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;
  const breadcrumbs = [
    { name: "Home", url: SITE_URL },
    { name: post.h1, url },
  ];

  return (
    <>
      <ArticleJsonLd
        url={url}
        headline={post.h1}
        description={post.metaDescription}
        image={post.heroImage}
        datePublished={post.publishedAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd items={breadcrumbs} />
      {post.faqs && post.faqs.length > 0 && <FaqJsonLd faqs={post.faqs} />}
      <BlogPostPage post={post} />
    </>
  );
}
