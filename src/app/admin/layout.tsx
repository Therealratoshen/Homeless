import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { authOptions } from '@/lib/auth'
import Link from 'next/link'
import { Building2, LayoutDashboard, PlusCircle, LogOut, ChevronLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-6 border-b border-slate-800">
          <Link href="/admin" className="flex items-center gap-2 font-bold text-lg">
            <Building2 className="h-6 w-6 text-blue-400" />
            <span>PropertiPilihan</span>
          </Link>
          <p className="text-xs text-slate-500 mt-1">Admin Dashboard</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1">
          <SidebarLink href="/admin" icon={LayoutDashboard} label="Dashboard" />
          <SidebarLink href="/admin/properti" icon={LayoutDashboard} label="Kelola Properti" />
          <SidebarLink href="/admin/properti/baru" icon={PlusCircle} label="Tambah Properti" isExternal />
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 space-y-2">
          <div className="px-3 py-2">
            <p className="text-sm font-medium truncate">{session.user?.name}</p>
            <p className="text-xs text-slate-500 truncate">{session.user?.email}</p>
          </div>
          <div className="flex gap-2">
            <Link href="/" className="flex-1">
              <Button variant="ghost" size="sm" className="w-full justify-start text-slate-400 hover:text-white gap-2">
                <ChevronLeft className="h-4 w-4" />
                Website
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              className="flex-1 justify-start text-slate-400 hover:text-red-400 gap-2"
              onClick={() => signOut({ callbackUrl: '/admin/login' })}
            >
              <LogOut className="h-4 w-4" />
              Keluar
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  )
}

function SidebarLink({
  href,
  icon: Icon,
  label,
  isExternal,
}: {
  href: string
  icon: React.ComponentType<{ className?: string }>
  label: string
  isExternal?: boolean
}) {
  return (
    <Link
      href={href}
      target={isExternal ? '_blank' : undefined}
      className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors text-sm"
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </Link>
  )
}
