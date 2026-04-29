"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createSnippet } from "@/lib/api";
import { SnippetType } from "@/types/snippet";

export default function SnippetForm() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState<SnippetType>("note");
  const [tags, setTags] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await createSnippet({
        title,
        content,
        type,
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
      });

      router.push("/snippets");
      router.refresh();
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border bg-white p-6 shadow-sm"
    >
      {error && (
        <div className="mb-4 rounded-lg bg-red-50 p-3 text-red-700">
          {error}
        </div>
      )}

      <div className="mb-4">
        <label className="mb-1 block font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          placeholder="Example: Useful Git command"
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium">Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="min-h-32 w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          placeholder="Write snippet content..."
        />
      </div>

      <div className="mb-4">
        <label className="mb-1 block font-medium">Type</label>
        <select
          value={type}
          onChange={(e) => setType(e.target.value as SnippetType)}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
        >
          <option value="note">Note</option>
          <option value="link">Link</option>
          <option value="command">Command</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="mb-1 block font-medium">Tags</label>
        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="w-full rounded-lg border px-4 py-2 outline-none focus:border-black"
          placeholder="react, nextjs, git"
        />
        <p className="mt-1 text-sm text-gray-500">
          Write tags separated by comma
        </p>
      </div>

      <button
        disabled={loading}
        className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800 disabled:opacity-60"
      >
        {loading ? "Creating..." : "Create snippet"}
      </button>
    </form>
  );
}