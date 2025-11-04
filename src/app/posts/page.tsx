"use client";

import { trpc } from "@/utils/trpcClient";
import Link from "next/link";

export default function PostsPage() {
  const { data: posts, isLoading, isError } = trpc.post.getAll.useQuery();

  if (isLoading) return <p>Loading posts...</p>;
  if (isError) return <p>Failed to load posts.</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">All Posts</h1>
      <Link
        href="/posts/new"
        className="inline-block mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + New Post
      </Link>

      {posts && posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border-b pb-2">
              <h2 className="text-xl font-semibold">{post.title}</h2>
              <p>{post.content}</p>
              {post.categoryId && <p className="text-sm text-gray-500">Category ID: {post.categoryId}</p>}
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </div>
  );
}
