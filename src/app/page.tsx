"use client";
import { trpc } from "@/utils/trpcClient";

export default function HomePage() {
  const { data: posts, isLoading } = trpc.post.getAll.useQuery();

  if (isLoading) return <p>Loading posts...</p>;

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">All Posts</h1>
      {posts && posts.length > 0 ? (
        <ul className="space-y-2">
          {posts.map((p) => (
            <li key={p.id} className="border p-3 rounded">
              <h2 className="font-semibold">{p.title}</h2>
              <p className="text-gray-600 text-sm">{p.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts found.</p>
      )}
    </main>
  );
}
