// /app/blog/[slug]/page.tsx
import { notFound } from "next/navigation";
import { getBlogBySlug, blogData } from "../blogData";
import BlogPostClient from "./BlogPostClient";

export async function generateStaticParams() {
  return blogData.map((post) => ({ slug: post.slug }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getBlogBySlug(params.slug);
  if (!post) notFound();
  return <BlogPostClient post={post} />;
}