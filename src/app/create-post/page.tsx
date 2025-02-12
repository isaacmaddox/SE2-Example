import { Metadata } from "next";
import CreatePostForm from "./CreatePostForm";

export const metadata: Metadata = {
   title: "Create a Post",
   description: "Create a post to share with the world",
};

export default function CreatePostPage() {
   return (
      <>
         <header className="flex items-center justify-between min-h-64 bg-gradient-to-b from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-zinc-950 text-zinc-50 dark:text-zinc-950">
            <div className="wrapper">
               <h1>Create a Post</h1>
               <p className="mt-3 text-lg leading-normal">Ideas derived from dreams are welcome!</p>
            </div>
         </header>
         <section className="wrapper">
            <CreatePostForm />
         </section>
      </>
   );
}
