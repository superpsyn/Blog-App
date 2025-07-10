import { currentUser } from '@clerk/nextjs/server'
import React, { ReactNode } from 'react'
import { prisma } from '@/lib/prisma'
import LeftSidebar from '@/components/dashboard/left-sidebar'

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const user = await currentUser()

  if (!user || !user.id) return null

  const loggedInUser = await prisma.user.findUnique({
    where: { clerkUserId: user.id as string },
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

  return (
    <div className="flex">
      <LeftSidebar />
      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  )
}