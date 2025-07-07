// app/(home)/layout.tsx
import { currentUser } from '@clerk/nextjs/server'
import React, { ReactNode } from 'react'
import { prisma } from '@/lib/prisma'

export default async function RootLayout({ children }: { children: ReactNode }) {
  const user = await currentUser()

  if (!user) return null

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id },
  })

  if (!loggedInUser) {
    await prisma.user.create({
      data: {
        name: user.fullName ?? 'No Name',
        clerkUserId: user.id,
        email: user.emailAddresses[0]?.emailAddress ?? '',
        imageUrl: user.imageUrl ?? '',
      },
    })
  }

  return <div>{children}</div>
}
