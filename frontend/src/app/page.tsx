import Link from "next/link";

export default function Home() {
  return (
    <section className="rounded-xl border bg-white p-8 shadow-sm">
      <h1 className="mb-4 text-3xl font-bold">Mini Snippet Vault</h1>

      <p className="mb-6 text-gray-600">
        Simple service for saving useful links, notes and commands.
      </p>

      <Link
        href="/snippets"
        className="rounded-lg bg-black px-5 py-3 text-white hover:bg-gray-800"
      >
        View snippets
      </Link>
    </section>
  );
}