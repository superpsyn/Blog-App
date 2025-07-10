import React from "react";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const LoadingArticlePage = () => {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <article className="mx-auto max-w-3xl">
          {/* Category + Title Skeleton */}
          <header className="mb-12">
            <div className="flex flex-wrap gap-2 mb-4">
              <Skeleton className="h-6 w-32 rounded-full" />
            </div>

            <Skeleton className="h-10 w-3/4 mb-4 rounded-md" />

            {/* Author Section */}
            <div className="flex items-center gap-4">
              <Avatar>
                <Skeleton className="h-10 w-10 rounded-full" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>

              <div>
                <Skeleton className="h-4 w-24 mb-1" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </header>

          {/* Article Content Skeleton */}
          <section className="mb-12 max-w-none space-y-4">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </section>

          {/* Like Button Skeleton */}
          <Skeleton className="h-8 w-24 mb-6" />

          {/* Comment Input Skeleton */}
          <Card className="p-4 mb-6">
            <Skeleton className="h-10 w-full" />
          </Card>

          {/* Comment List Skeletons */}
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Card key={i} className="p-4 flex gap-4 items-start">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div className="space-y-2 w-full">
                  <Skeleton className="h-4 w-1/2" />
                  <Skeleton className="h-3 w-3/4" />
                </div>
              </Card>
            ))}
          </div>
        </article>
      </main>
    </div>
  );
};

export default LoadingArticlePage;
