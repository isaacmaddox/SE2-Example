"use server";

import { PostDAO } from "./dao";
import { redirect } from "next/navigation";

export const getPosts = async () => {
   return PostDAO.getPosts();
}

export async function createPost(_: unknown, formData: FormData) {
   const title = formData.get("title")?.toString();
   const content = formData.get("content")?.toString();

   if (!title || !content) {
      return { message: "Title and content are required" };
   }

   if (content.length < 10) {
      return { message: "Content must be at least 10 characters long" };
   }

   if (content.length > 250) {
      return { message: "Content must be less than 250 characters long" };
   }

   await PostDAO.createPost(title, content);

   redirect("/");
};

export const getPost = async (id: string) => {
   return PostDAO.getPost(parseInt(id));
};

export const getPostWithComments = async (id: string) => {
   return PostDAO.getPostWithComments(parseInt(id));
};

export const createComment = async (_: unknown, formData: FormData) => {
   const content = formData.get("content")?.toString();
   const postId = formData.get("postId")!.toString();

   if (!content) {
      return { message: "Content is required" };
   }

   if (content.length < 10) {
      return { message: "Content must be at least 10 characters long" };
   }

   await PostDAO.createComment(parseInt(postId), content);

   redirect(`/post/${postId}`);
}