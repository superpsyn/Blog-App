import React from "react";
import { Card } from "../ui/card";
import Image from "next/image";
import { Avatar, AvatarImage } from "../ui/avatar";
import { AvatarFallback } from "../ui/avatar";
import { fetchArticleByQuery } from "@/lib/query/fetch-article-by-query";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type AllArticlePageProps = {
  searchText: string;
};

const AllArticlePage: React.FC<AllArticlePageProps> = async ({
  searchText,
}) => {
  const articles = await fetchArticleByQuery(searchText);

  if (!articles.length) {
    return <NoSearchResults />;
  }



    return (
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link href={`/articles/${article.id}`} key={article.id}>
            <Card
              className={cn(
                "group relative overflow-hidden transition-all hover:scale-[1.02]",
                "border border-gray-200/50 dark:border-white/10",
                "bg-white/50 dark:bg-gray-900/50 backdrop-blur-lg"
              )}
            >
              <div className="p-6">
                <div className="relative mb-4 h-48 w-full overflow-hidden rounded-xl">
                  <Image
                    src={article.featuredImage}
                    alt="article"
                    fill
                    className="object-cover"
                  />
                </div>
  
                <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={article.author.imageUrl || ""} />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span>{article.author.name}</span>
                </div>
  
                <h3 className="mt-4 text-xl font-semibold text-gray-900 dark:text-white">
                  {article.title}
                </h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300">
                  {article.category.toUpperCase()}
                </p>
  
                <div className="mt-6 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>{article.createdAt.toDateString()}</span>
                  <span>5 min to read</span>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    );
  };



export default AllArticlePage;

const NoSearchResults = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      <div className="mb-4 rounded-full bg-muted p-4">
        <Search className="h-8 w-8" />
      </div>
      <h3 className="font-bold">No Result found</h3>

      <p className="mt-2 text-sm">
        We could not find any articles matching your search. Try a different keyword or phrase. 
      </p>
    </div>
  );
};
