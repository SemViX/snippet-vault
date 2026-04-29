"use client";

import { useRouter } from "next/navigation";
import { deleteSnippet } from "@/lib/api";
import { useState } from "react";

interface Props {
  id: string;
}

export default function DeleteButton({ id }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    const confirmed = confirm("Delete this snippet?");

    if (!confirmed) return;

    try {
      setLoading(true);
      await deleteSnippet(id);
      router.push("/snippets");
      router.refresh();
    } catch {
      alert("Failed to delete snippet");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleDelete}
      disabled={loading}    
      className="rounded-lg bg-red-600 px-4 py-2 text-white hover:bg-red-700 disabled:opacity-60"
    >
      {loading ? "Deleting..." : "Delete"}
    </button>
  );
}