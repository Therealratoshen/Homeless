'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Building2, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

const navLinks = [
  { href: '/', label: 'Beranda' },
  { href: '/properti', label: 'Properti' },
]

export function MainNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-blue-600">
          <Building2 className="h-6 w-6" />
          <span>PropertiPilihan</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors hover:text-blue-600',
                pathname === link.href ? 'text-blue-600' : 'text-muted-foreground'
              )}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/admin">
            <Button variant="outline" size="sm">Masuk Admin</Button>
          </Link>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger className="md:hidden" render={<Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>} />
          <SheetContent side="right">
            <div className="flex flex-col gap-4 mt-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'text-base font-medium transition-colors hover:text-blue-600',
                    pathname === link.href ? 'text-blue-600' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <Link href="/admin" onClick={() => setOpen(false)}>
                <Button variant="outline" className="w-full">Masuk Admin</Button>
              </Link>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
