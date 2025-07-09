
import { Prisma } from '@/app/generated/prisma/client'
import React from 'react'
import { Avatar, AvatarImage } from '../ui/avatar'
import { AvatarFallback } from '@radix-ui/react-avatar'
import LikeButton from './like-button'
import CommentList from '../comments/comment-list'

type ArticleDetailPageProps = {
    article : Prisma.ArticlesGetPayload<{
        include: {
            author: {
                select: {
                    name: true,
                    email: true,
                    imageUrl: true
                }
            }
        }
    }>
}


const ArticleDetailPage:React.FC<ArticleDetailPageProps> = ({article}) => {
  return (
    <div className='min-h-screen bg-background'>
        <main className='container mx-auto py-12 px-4 sm:px-6 lg:px-8'>
            <article className='mx-auto max-w-3xl'>
                <header className='mb-12'>
                    <div className='flex flex-wrap gap-2 mb-4'>
                        <span className='px-3 py-1 text-sm'>
                            web-development
                        </span>

                       
                    </div>
                    <h1 className='text-4xl font-bold mb-4'>{article.title}</h1>

                    <div className='flex items-center gap-4'>
                        <Avatar>
                            <AvatarImage src={article.author.imageUrl || ""}/>
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>

                        <div>
                            <p className='font-medium'>{article.author.name}</p>
                            <p className='text-sm'>{article.createdAt.toDateString()} .12 min to read</p>
                        </div>
                    </div>

                </header>

                <section className='mb-12 max-w-none' dangerouslySetInnerHTML={{__html:article.content}}>

                </section>

                {/* Article action button */}
                
                <LikeButton />
                
                {/* Comment section */}

                <CommentList />

            </article>
        </main>
    </div>
  )
}

export default ArticleDetailPage