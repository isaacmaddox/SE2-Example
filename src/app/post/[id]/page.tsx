import { getPost, getPostWithComments } from "@/entities/post/service";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import CommentForm from "./CommentForm";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export const generateMetadata = async ({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> => {
   const { id } = await params;

   const post = await getPost(id);

   if (!post) {
      return notFound();
   }

   return {
      title: `Post: ${post.title}`,
      description: post.content,
   };
};

export default async function PostPage({ params }: { params: Promise<{ id: string }> }) {
   const { id } = await params;

   const post = await getPostWithComments(id);

   if (!post) {
      return notFound();
   }

   return (
      <>
         <header className="flex items-center justify-between min-h-64 bg-gradient-to-b from-zinc-300 to-zinc-100 dark:from-zinc-900 dark:to-zinc-950 text-zinc-50 dark:text-zinc-950">
            <div className="wrapper">
               <h1>{post.title}</h1>
            </div>
         </header>
         <section className="wrapper">
            <Markdown remarkPlugins={[remarkGfm]} className="post-body text-xl leading-loose whitespace-pre-wrap">
               {post.content}
            </Markdown>
            <small className="block mt-8 wrapper text-zinc-500 dark:text-zinc-400">
               Posted on {post.createdAt.toLocaleDateString()} at{" "}
               {post.createdAt.toLocaleTimeString("en-US", {
                  hour: "2-digit",
                  minute: "2-digit",
               })}
            </small>
         </section>
         <section className="wrapper border-t-[1px] border-zinc-200 dark:border-zinc-800 mt-8 pt-8">
            <h2 className="mb-2">Comments ({post.comments.length})</h2>
            <CommentForm postId={id} />
            {post.comments.length > 0 ? (
               <ul>
                  {post.comments.map((comment) => (
                     <li className="py-6 border-b-[1px] border-zinc-200 dark:border-zinc-800" key={comment.id}>
                        <p className="text-lg whitespace-pre-wrap text-zinc-900 dark:text-zinc-50">{comment.content}</p>
                        <small className="block mt-2 text-zinc-500 dark:text-zinc-400">
                           Posted on {comment.createdAt.toLocaleDateString()} at{" "}
                           {comment.createdAt.toLocaleTimeString("en-US", {
                              hour: "2-digit",
                              minute: "2-digit",
                           })}
                        </small>
                     </li>
                  ))}
               </ul>
            ) : (
               <p className="mt-4 text-center text-zinc-500 dark:text-zinc-400">No comments yet.</p>
            )}
         </section>
      </>
   );
}
