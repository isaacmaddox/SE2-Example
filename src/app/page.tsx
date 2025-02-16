import Button from "@/components/Button";
import { getPosts } from "@/entities/post/service";
import { prisma } from "@/lib/prisma";
import { Metadata } from "next";
import { redirect } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const metadata: Metadata = {
   title: "Your Feed",
   description: "Your unpersonailzed feed of posts!",
};

export const revalidate = 0;

export default async function Home() {
   const posts = await getPosts();

   return (
      <>
         <header className="flex items-center justify-between min-h-64 bg-gradient-to-b from-zinc-300 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 text-zinc-50 dark:text-zinc-950">
            <div className="wrapper">
               <h1>Your Feed</h1>
               <p className="mt-3 text-lg leading-normal">A feed for you that is not customized in any way, shape, or form</p>
            </div>
         </header>
         <section className="wrapper">
            {posts.length === 0 ? (
               <p className="text-center text-zinc-500 dark:text-zinc-400">
                  No posts yet.{" "}
                  <Link href="/create-post" className="text-zinc-900 dark:text-zinc-50 underline underline-offset-[.25em]">
                     Create yours now
                  </Link>
               </p>
            ) : (
               <ul>
                  {posts.map((post) => {
                     return (
                        <li key={post.id} className="py-6 my-6 border-b-[1px] border-zinc-200 dark:border-zinc-800">
                           <Link href={`/post/${post.id}`}>
                              <h2>{post.title}</h2>
                           </Link>
                           <ReactMarkdown remarkPlugins={[remarkGfm]} className="post-body my-5 whitespace-pre-wrap">
                              {post.content}
                           </ReactMarkdown>
                           <small className="text-zinc-500 dark:text-zinc-400">
                              Posted on {post.createdAt.toLocaleDateString()} at{" "}
                              {post.createdAt.toLocaleTimeString("en-US", {
                                 hour: "2-digit",
                                 minute: "2-digit",
                              })}
                           </small>
                        </li>
                     );
                  })}
               </ul>
            )}
         </section>
         {process.env.NODE_ENV === "development" && posts.length > 0 && (
            <section className="wrapper pb-8">
               <Button
                  onClick={async () => {
                     "use server";
                     await prisma.post.deleteMany();
                     redirect("/");
                  }}
                  className="destructive">
                  Clear posts
               </Button>
            </section>
         )}
      </>
   );
}
