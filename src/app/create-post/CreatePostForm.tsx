"use client";

import Button from "@/components/Button";
import { useActionState } from "react";
import { createPost } from "@/entities/post/actions";
import Link from "next/link";

export default function CreatePostForm() {
   const [state, formAction, pending] = useActionState(createPost, { message: "" });

   return (
      <form className="flex flex-col gap-4" action={formAction}>
         <div className="flex flex-col gap-2">
            <label htmlFor="title" className="text-zinc-700 dark:text-zinc-300">
               Title
            </label>
            <input type="text" name="title" id="title" />
         </div>
         <div className="flex flex-col gap-2">
            <label htmlFor="content" className="text-zinc-700 dark:text-zinc-300">
               Content
            </label>
            <textarea className="min-h-32" name="content" id="content"></textarea>
         </div>
         {state.message && <p className="text-red-800 dark:text-red-500">{state.message}</p>}
         <div className="grid grid-cols-2 gap-4">
            <Button disabled={pending} type="submit" className="primary">
               Create Post
            </Button>
            <Link href="/" className="btn">
               Cancel
            </Link>
         </div>
         <small className="text-zinc-500 dark:text-zinc-400">Posts are permanent, so don&apos;t be stupid!</small>
      </form>
   );
}
