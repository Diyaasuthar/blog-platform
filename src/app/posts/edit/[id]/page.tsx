"use client";

import { trpc } from "@/utils/trpcClient";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function EditPostPage() {
  const { id } = useParams();
  const router = useRouter();
  const postId = Number(id);

  const { data: post, isLoading } = trpc.post.getById.useQuery(postId, {
    enabled: !isNaN(postId),
  });

  const updatePost = trpc.post.create.useMutation({
    onSuccess: () => {
      alert("✅ Post updated successfully!");
      router.push("/posts");
    },
    onError: (error) => {
      alert("❌ Error: " + error.message);
    },
  });

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  if (isLoading) return <p className="p-6 text-gray-600">Loading post...</p>;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updatePost.mutate({ title, content }); // we'll replace this with update mutation next
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Edit Post</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
      >
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          disabled={updatePost.isPending}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {updatePost.isPending ? "Updating..." : "Update Post"}
        </button>
      </form>
    </div>
  );
}
