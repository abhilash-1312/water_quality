'use client'

import { useState } from 'react'
import { SessionUser } from '@/types/auth'
import { Role } from '@repo/db/types'
import { usePathname } from 'next/navigation'
import { Separator } from '@/components/ui/separator'
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'
import { Button } from '@/components/ui/button'
import { NewRequestModal } from '../testrequests/NewRequestModal'
import AppSidebar from '@/components/sidebar/AppSidebar'
import { SidebarBreadcrumb } from '@/components/sidebar/SidebarBreadcrumb'

export default function Sidebar({
  user,
  children,
}: {
  user: SessionUser
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [modalOpen, setModalOpen] = useState(false)

  return (
    <>
      <SidebarProvider>
        <AppSidebar user={user} />
        <SidebarInset className="overflow-hidden">
          <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
            <div className="flex items-center px-4 justify-between w-full">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <Separator
                  orientation="vertical"
                  className="mr-2 data-[orientation=vertical]:h-4"
                />
                <SidebarBreadcrumb />
              </div>
              {user.role === Role.user && pathname.startsWith('/requests') && (
                <Button onClick={() => setModalOpen(true)}>New Request</Button>
              )}
            </div>
          </header>
          {children}
        </SidebarInset>
      </SidebarProvider>

      <NewRequestModal open={modalOpen} onOpenChange={setModalOpen} />
    </>
  )
}
