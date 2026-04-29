import { CreateSnippetDto, Snippet } from "@/types/snippet";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function getSnippets(params?: {
  q?: string;
  tag?: string;
}) {
  const searchParams = new URLSearchParams();

  if (params?.q) searchParams.append("q", params.q);
  if (params?.tag) searchParams.append("tag", params.tag);

  const res = await fetch(`${API_URL}/snippets?${searchParams.toString()}`, {
    cache: "no-store",
  });

  const data = await res.json();

  return data; 
}

export async function getSnippet(id: string): Promise<Snippet> {
  const res = await fetch(`${API_URL}/snippets/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch snippet");
  }

  return res.json();
}

export async function createSnippet(data: CreateSnippetDto) {
  const res = await fetch(`${API_URL}/snippets`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to create snippet");
  }

  return res.json();
}

export async function deleteSnippet(id: string) {
  const res = await fetch(`${API_URL}/snippets/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error("Failed to delete snippet");
  }
}
