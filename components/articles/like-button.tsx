"use client";
import React, { useOptimistic, useTransition, useState } from "react";
import { Button } from "../ui/button";
import { Bookmark, Share2, ThumbsUp } from "lucide-react";
import { likeDislikeToggle } from "@/actions/like-dislike";
import { Like } from "@/app/generated/prisma";

type LikeButtonProps = {
  articleId: string;
  likes: Like[];
  isLiked: boolean;
};

const LikeButton: React.FC<LikeButtonProps> = ({
  articleId,
  likes,
  isLiked,
}) => {
  const [optimisticLike, setOptimisticLike] = useOptimistic(likes.length);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);

  const handleLikeDislike = async () => {
    setError(null);
    startTransition(async () => {
      setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1);
      
      const result = await likeDislikeToggle(articleId);
  
      if (!result || !result.success) {
        setError(result?.error || "Something went wrong");
        setOptimisticLike(isLiked ? optimisticLike + 1 : optimisticLike - 1);
      }
    });
  };
  

  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <Button
        disabled={isPending}
        type="button"
        className="gap-2"
        variant="ghost"
        onClick={handleLikeDislike}
      >
        <ThumbsUp className="h-5 w-5" />
        {optimisticLike}
      </Button>
      {error && <p className="text-red-600">{error}</p>}

      <Button className="gap-2" variant="ghost">
        <Bookmark className="h-5 w-5" /> 0
      </Button>

      <Button className="gap-2" variant="ghost">
        <Share2 className="h-5 w-5" /> 0
      </Button>
    </div>
  );
};

export default LikeButton;
