import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Prisma } from '@/app/generated/prisma/client'

type CommentListProp = {
    comments: Prisma.CommentGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>[]
}


const CommentList: React.FC<CommentListProp> = ({comments}) => {
  return (
    <div className='space-y-8'>
        {
            comments.map((comment)=> (
                <div key={comment.id} className='flex gap-4'>
            <Avatar className='h-10 w-10'>
                <AvatarImage src={comment.author.imageUrl || ""}/>
                <AvatarFallback>{comment.author.name}</AvatarFallback>
            </Avatar>

            <div className='flex-1'>
                <div className='mb-2'>
                    <span>
                        {comment.author.name}
                    </span>
                    <span className='text-sm ml-2'>
                        {comment.createdAt.toDateString()}
                    </span>
                </div>
                <p>{comment.body}</p>
            </div>
            
        </div>
            ))
        }
        
    </div>
  )
}

export default CommentList