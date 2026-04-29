import Link from "next/link";
import { Snippet } from "@/types/snippet";

interface Props {
  snippet: Snippet;
}

export default function SnippetCard({ snippet }: Props) {
  return (
    <div className="rounded-xl border bg-white p-5 shadow-sm">
      <div className="mb-2 flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">{snippet.title}</h2>

        <span className="rounded-full bg-gray-100 px-3 py-1 text-sm">
          {snippet.type}
        </span>
      </div>

      <p className="mb-4 line-clamp-3 text-gray-600">{snippet.content}</p>

      <div className="mb-4 flex flex-wrap gap-2">
        {snippet.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link
        href={`/snippets/${snippet._id}`}
        className="text-sm font-medium text-blue-600 hover:underline"
      >
        View details
      </Link>
    </div>
  );
}