// src/components/Navbar.tsx
"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center">
      <h1 className="font-bold text-xl">My Blog</h1>
      <div className="space-x-4">
        <Link href="/posts" className="hover:underline">
          All Posts
        </Link>
        <Link href="/posts/new" className="hover:underline">
          New Post
        </Link>
      </div>
    </nav>
  );
}
