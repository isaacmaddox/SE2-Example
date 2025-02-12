import { prisma } from "@/lib/prisma";

export const PostService = {
   async getPosts() {
      return prisma.post.findMany({
         orderBy: {
            createdAt: "desc",
         },
         where: {
            parentId: null,
         },
      });
   },

   async createPost(title: string, content: string) {
      return prisma.post.create({
         data: { title, content },
      });
   },

   async getPost(id: number) {
      return prisma.post.findUnique({
         where: { id },
      });
   },

   async getPostWithComments(id: number) {
      return prisma.post.findUnique({
         where: { id },
         include: { comments: { orderBy: { createdAt: "desc" } } },
      });
   },

   async createComment(postId: number, content: string) {
      return prisma.post.create({
         data: { content, parent: { connect: { id: postId } } },
      });
   },
};
