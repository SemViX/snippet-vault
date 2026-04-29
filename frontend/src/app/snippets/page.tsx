import Link from "next/link";
import { getSnippets } from "@/lib/api";
import SnippetCard from "@/components/SnippetCard";
import SearchFilters from "@/components/SearchFilters";
import { Snippet } from "@/types/snippet";

interface Props {
  searchParams: Promise<{
    q?: string;
    tag?: string;
  }>;
}

export default async function SnippetsPage({ searchParams }: Props) {
  const params = await searchParams;

  const data = await getSnippets({
    q: params.q,
    tag: params.tag,
  });

  const snippets = data.items;
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Snippets</h1>

        <Link
          href="/snippets/new"
          className="rounded-lg bg-black px-4 py-2 text-white hover:bg-gray-800"
        >
          Add snippet
        </Link>
      </div>

      <SearchFilters />

      {snippets.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center text-gray-600">
          No snippets found
        </div>
      ) : (
        <div className="grid gap-4">
          {snippets.map((snippet: Snippet) => (
            <SnippetCard key={snippet._id} snippet={snippet} />
          ))}
        </div>
      )}
    </div>
  );
}
