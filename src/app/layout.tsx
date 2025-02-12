import type { Metadata } from "next";
import { Figtree } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const figtree = Figtree({
   variable: "--font-figtree",
   subsets: ["latin"],
});

export const metadata: Metadata = {
   title: "NextJS Examples",
   description: "Made by Isaac Maddox to be a point of reference for future projects",
};

export default function RootLayout({
   children,
}: Readonly<{
   children: React.ReactNode;
}>) {
   return (
      <html lang="en">
         <body className={`${figtree.variable} bg-zinc-100 dark:bg-zinc-950 antialiased`}>
            <nav className="sticky inset-x-0 top-0 z-10 py-4 bg-zinc-100 dark:bg-zinc-950 dark:bg-opacity-50 bg-opacity-50 backdrop-blur-lg border-b-[1px] border-zinc-200 dark:border-zinc-800">
               <div className="flex items-center justify-between gap-8 wrapper">
                  <Link href="/" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                     NextJS Examples
                  </Link>
                  <div>
                     <Link href="/create-post" className="btn">
                        Create Post
                     </Link>
                  </div>
               </div>
            </nav>
            <main>{children}</main>
            <footer></footer>
         </body>
      </html>
   );
}
