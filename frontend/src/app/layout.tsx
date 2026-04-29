import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mini Snippet Vault",
  description: "Service for saving useful snippets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body>
        <header className="border-b bg-white">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4">
            <Link href="/" className="text-xl font-bold">
              Mini Snippet Vault
            </Link>

            <nav className="flex gap-4">
              <Link href="/snippets" className="text-sm hover:underline">
                Snippets
              </Link>
              <Link href="/snippets/new" className="text-sm hover:underline">
                Add snippet
              </Link>
            </nav>
          </div>
        </header>

        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
      </body>
    </html>
  );
}