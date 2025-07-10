import { prisma } from "../prisma";

export const fetchArticleByQuery = async (searchText: string) => {

  
  const articles = await prisma.articles.findMany({
    where: {
      OR: [
        { title: { contains: searchText, mode: "insensitive" } },
        { category: { contains: searchText, mode: "insensitive" } },
      ],
    },

    include: {
      author: {
        select: {
          name: true,
          imageUrl: true,
          email: true,
        },
      },
    },
  });

  return articles;
};
