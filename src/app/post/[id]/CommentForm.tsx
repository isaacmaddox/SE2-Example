"use client";

import Button from "@/components/Button";
import { createComment } from "@/entities/post/actions";
import { useActionState } from "react";

export default function CommentForm({ postId }: { postId: string }) {
   const [state, formAction, pending] = useActionState(createComment, { message: "" });

   return (
      <form className="flex flex-col gap-4" action={formAction}>
         <input type="hidden" name="postId" value={postId} />
         <div className="flex flex-col gap-2">
            <label htmlFor="content" className="sr-only">
               Your Comment
            </label>
            <textarea name="content" id="content"></textarea>
         </div>
         {state.message && <p className="text-red-800 dark:text-red-500">{state.message}</p>}
         <div className="grid grid-cols-2 gap-4">
            <Button disabled={pending} type="submit" className="primary">
               {!pending ? "Comment" : "Processing..."}
            </Button>
            <Button type="reset" className="btn">
               Cancel
            </Button>
         </div>
      </form>
   );
}
