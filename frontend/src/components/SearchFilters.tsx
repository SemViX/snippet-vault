"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function SearchFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [q, setQ] = useState(searchParams.get("q") || "");
  const [tag, setTag] = useState(searchParams.get("tag") || "");

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const params = new URLSearchParams();

    if (q) params.set("q", q);
    if (tag) params.set("tag", tag);

    router.push(`/snippets?${params.toString()}`);
  }

  function clearFilters() {
    setQ("");
    setTag("");
    router.push("/snippets");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mb-6 grid gap-3 rounded-xl border bg-white p-4 shadow-sm md:grid-cols-[1fr_1fr_auto_auto]"
    >
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search by title/content..."
        className="rounded-lg border px-4 py-2 outline-none focus:border-black"
      />

      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Filter by tag..."
        className="rounded-lg border px-4 py-2 outline-none focus:border-black"
      />

      <button
        type="submit"
        className="rounded-lg bg-black px-5 py-2 text-white hover:bg-gray-800"
      >
        Search
      </button>

      <button
        type="button"
        onClick={clearFilters}
        className="rounded-lg border px-5 py-2 hover:bg-gray-50"
      >
        Clear
      </button>
    </form>
  );
}