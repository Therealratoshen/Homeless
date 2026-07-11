import Link from 'next/link'
import { Building2, PlusCircle, Eye, Edit } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { createServerSupabase } from '@/lib/supabase/server'
import { Property } from '@/types/database'

function formatPrice(price: number): string {
  if (price >= 1_000_000_000) return `Rp ${(price / 1_000_000_000).toFixed(1)} M`
  return `Rp ${(price / 1_000_000).toFixed(0)} JT`
}

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabase()

  const [
    { count: total },
    { count: tersedia },
    { count: terjual },
    { count: disewa },
  ] = await Promise.all([
    supabase.from('properties').select('*', { count: 'exact', head: true }),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'tersedia'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'terjual'),
    supabase.from('properties').select('*', { count: 'exact', head: true }).eq('status', 'disewa'),
  ])

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { data: recent } = await (supabase
    .from('properties')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5) as any)

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-500">Selamat datang di dashboard PropertiPilihan</p>
        </div>
        <Link href="/admin/properti/baru">
          <Button className="gap-2">
            <PlusCircle className="h-4 w-4" />
            Tambah Properti
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Properti', value: total ?? 0, color: 'text-slate-900' },
          { label: 'Tersedia', value: tersedia ?? 0, color: 'text-emerald-600' },
          { label: 'Terjual', value: terjual ?? 0, color: 'text-red-600' },
          { label: 'Disewa', value: disewa ?? 0, color: 'text-amber-600' },
        ].map(({ label, value, color }) => (
          <Card key={label}>
            <CardContent className="pt-6">
              <p className="text-sm text-slate-500 mb-1">{label}</p>
              <p className={`text-3xl font-bold ${color}`}>{value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent Properties */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Properti Terbaru</CardTitle>
          <Link href="/admin/properti">
            <Button variant="ghost" size="sm">Lihat Semua</Button>
          </Link>
        </CardHeader>
        <CardContent>
          {recent && recent.length > 0 ? (
            <div className="space-y-3">
              {recent.map((p: Property) => (
                <div key={p.id} className="flex items-center justify-between py-3 border-b last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-slate-900 truncate">{p.title}</p>
                    <p className="text-xs text-slate-500">{p.location}</p>
                  </div>
                  <div className="flex items-center gap-3 ml-4">
                    <Badge
                      className={
                        p.status === 'tersedia'
                          ? 'bg-emerald-100 text-emerald-800'
                          : p.status === 'terjual'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-amber-100 text-amber-800'
                      }
                    >
                      {p.status}
                    </Badge>
                    <p className="text-sm font-semibold text-blue-600 whitespace-nowrap">
                      {formatPrice(p.price)}
                    </p>
                    <div className="flex gap-1">
                      <Link href={`/properti/${p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`} target="_blank">
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Link href={`/admin/properti/${p.id}/edit`}>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <Building2 className="h-10 w-10 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 mb-4">Belum ada properti</p>
              <Link href="/admin/properti/baru">
                <Button size="sm" className="gap-2">
                  <PlusCircle className="h-4 w-4" />
                  Tambah Properti Pertama
                </Button>
              </Link>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
