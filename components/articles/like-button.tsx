"use client";
import React, { useOptimistic, useTransition } from "react";
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

  const handleLikeDislike = async () => {
    startTransition(async () => {
      setOptimisticLike(isLiked ? optimisticLike - 1 : optimisticLike + 1);
      await likeDislikeToggle(articleId);
    });
  };

  return (
    <div className="flex gap-4 mb-12 border-t pt-8">
      <form action={handleLikeDislike}>
        <Button disabled={isPending} type="submit" className="gap-2" variant={"ghost"}>
          <ThumbsUp className="h-5 w-5" />
          {optimisticLike}
        </Button>
      </form>
      <Button className="gap-2" variant={"ghost"}>
        <Bookmark className="h-5 w-5" />0
      </Button>

      <Button className="gap-2" variant={"ghost"}>
        <Share2 className="h-5 w-5" />0
      </Button>
    </div>
  );
};

export default LikeButton;
