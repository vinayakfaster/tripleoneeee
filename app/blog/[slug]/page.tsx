// /app/blog/[slug]/page.tsx

import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getBlogBySlug, blogData } from "../blogData";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = getBlogBySlug(params.slug);
  if (!post) return {};

  return {
    title: `${post.title} | ${post.location} — TripleOne Bookings`,
    description: post.intro,
    keywords: `${post.location}, ${post.category}, room in Supernova Noida, luxury stay Noida`,
    openGraph: {
      title: `${post.title} | ${post.location}`,
      description: post.intro,
      images: [post.image],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${post.location}`,
      description: post.intro,
      images: [post.image],
    },
  };
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}

