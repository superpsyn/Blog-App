'use server';

import { auth } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export const deleteArticle = async (articleId: string) => {
  const { userId } = await auth();

  if (!userId) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    await prisma.articles.delete({
      where: { id: articleId },
    });
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : "Failed to delete article.";
    console.error("Error deleting article:", errMsg);
    return { success: false, error: errMsg };
  }
};
