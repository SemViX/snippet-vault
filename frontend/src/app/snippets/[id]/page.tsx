import Link from "next/link";
import { getSnippet } from "@/lib/api";
import DeleteButton from "./DeleteButton";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function SnippetDetailsPage({ params }: Props) {
  const { id } = await params;
  const snippet = await getSnippet(id);

  return (
    <div className="rounded-xl border bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">{snippet.title}</h1>
          <p className="mt-1 text-sm text-gray-500">
            Type: {snippet.type}
          </p>
        </div>

        <DeleteButton id={snippet._id} />
      </div>

      <p className="mb-6 whitespace-pre-wrap text-gray-700">
        {snippet.content}
      </p>

      <div className="mb-6 flex flex-wrap gap-2">
        {snippet.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-blue-50 px-3 py-1 text-sm text-blue-700"
          >
            #{tag}
          </span>
        ))}
      </div>

      <Link href="/snippets" className="text-blue-600 hover:underline">
        Back to snippets
      </Link>
    </div>
  );
}