"use client";

import { useState } from "react";
import { trpc } from "@/utils/trpcClient";
import { useRouter } from "next/navigation";

export default function NewPostPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState<number | undefined>(undefined); // undefined if no category

  // Fetch categories
  const { data: categories, isLoading: isCategoriesLoading } = trpc.category.getAll.useQuery();

  // Mutation
  const createPost = trpc.post.create.useMutation({
    onSuccess: () => {
      alert("✅ Post created successfully!");
      router.push("/posts");
    },
    onError: (error) => {
      alert("❌ Error: " + error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("Please fill in all fields");
      return;
    }

    // Pass undefined instead of null for optional category
    createPost.mutate({
      title,
      content,
      categoryId, // undefined if not selected
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Post</h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-sm border border-gray-200"
      >
        {/* Title */}
        <div>
          <label className="block text-gray-700 mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter post title"
          />
        </div>

        {/* Content */}
        <div>
          <label className="block text-gray-700 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border border-gray-300 rounded-md p-2 h-32 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Write your content here..."
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-gray-700 mb-2">Category</label>
          {isCategoriesLoading ? (
            <p>Loading categories...</p>
          ) : (
            <select
              value={categoryId ?? ""}
              onChange={(e) => {
                const val = e.target.value;
                setCategoryId(val ? Number(val) : undefined); // undefined if not selected
              }}
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select category</option>
              {categories?.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={createPost.isPending} // use isLoading, not isPending
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {createPost.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>
    </div>
  );
}
