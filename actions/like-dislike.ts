"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const likeDislikeToggle = async (articleId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "You must be logged in to like an article" };
  }

  const user = await prisma.user.findUnique({
    where: {
      clerkUserId: userId,
    },
  });

  if (!user) {
    return { success: false, error: "User doesn't exist" };
  }

  const existingLike = await prisma.like.findFirst({
    where: {
      articleId,
      userId: user.id,
    },
  });

  if (existingLike) {
    //dislike

    await prisma.like.delete({
      where: { id: existingLike.id },
    });
  } else {
    //like
    await prisma.like.create({
      data: {
        articleId,
        userId: user.id,
      },
    });
  }

  revalidatePath(`/articles/${articleId}`)
  return { success: true };
};
