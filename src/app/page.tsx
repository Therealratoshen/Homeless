import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Home, Building2, Shield, TrendingUp, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { PropertyCard } from '@/components/properti/property-card'
import { WhatsAppFAB } from '@/components/layout/whatsapp-fab'
import { createServerSupabase } from '@/lib/supabase/server'
import { Property } from '@/types/database'

export const revalidate = 60 // ISR: revalidate every 60s

export default async function HomePage() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const supabase = (await createServerSupabase()) as any

  const { data: featuredProperties } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'tersedia')
    .order('created_at', { ascending: false })
    .limit(6) as { data: Property[] | null }

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <Image
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80"
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-2xl">
            <Badge className="bg-blue-500/30 text-blue-100 border-blue-400/50 mb-4 text-xs">
              🏠 Platform Properti #1 di Indonesia
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6 text-balance">
              Temukan Rumah
              <br />
              <span className="text-blue-300">Impian Anda</span>
            </h1>
            <p className="text-blue-100 text-lg md:text-xl mb-8 leading-relaxed">
              Ribuan properti pilihan di seluruh Indonesia. Rumah, apartemen, villa,
              dan tanah — semua dalam satu platform terpercaya.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/properti">
                <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2">
                  Lihat Properti <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
              <Link href="/admin">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Pasang Properti
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-12">
            <path d="M0 60L60 50C120 40 240 20 360 15C480 10 600 15 720 20C840 25 960 30 1080 32.5C1200 35 1320 35 1380 35L1440 35V60H0Z" fill="white" />
          </svg>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Home, label: 'Properti Tersedia', value: '2,500+' },
              { icon: Building2, label: 'Lokasi', value: '50+' },
              { icon: Shield, label: 'Transaksi Aman', value: '100%' },
              { icon: TrendingUp, label: 'Harga Transparan', value: 'Real-time' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-2 p-4">
                <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <p className="font-bold text-xl text-slate-900">{value}</p>
                <p className="text-sm text-slate-500">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Properties ── */}
      <section className="py-16 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Properti Pilihan</h2>
              <p className="text-slate-500 mt-1">Properti terbaik yang baru saja kami pasarkan</p>
            </div>
            <Link href="/properti">
              <Button variant="ghost" className="gap-2 text-blue-600 hover:text-blue-700">
                Lihat Semua <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          {featuredProperties && featuredProperties.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties.map((p, i) => (
                <PropertyCard key={p.id} property={p} priority={i < 3} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-xl border border-slate-200">
              <Building2 className="h-12 w-12 text-slate-300 mx-auto mb-4" />
              <p className="text-slate-500 text-lg mb-4">Belum ada properti yang dipublikasikan</p>
              <Link href="/admin/properti/baru">
                <Button>Tambah Properti Pertama</Button>
              </Link>
            </div>
          )}
        </div>
      </section>

      {/* ── Why Us ── */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Kenapa PropertiPilihan?
            </h2>
            <p className="text-slate-500">Keunggulan yang membedakan kami dari platform lain</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Terpercaya',
                desc: 'Setiap properti diverifikasi sebelum dipublikasikan. Tidak ada kost palsu, tidak ada harga markup.',
                icon: Shield,
              },
              {
                title: 'Harga Transparan',
                desc: 'Harga yang ditampilkan adalah harga sebenarnya. Tidak ada biaya tersembunyi atau negotiations yang rumit.',
                icon: TrendingUp,
              },
              {
                title: 'Layanan Cepat',
                desc: 'Tim kami siap membantu 24/7 via WhatsApp. Konsultasi gratis untuk kebutuhan properti Anda.',
                icon: CheckCircle,
              },
            ].map(({ title, desc, icon: Icon }) => (
              <div key={title} className="bg-slate-50 rounded-xl p-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Siap Menemukan Properti Impian?</h2>
          <p className="text-blue-100 text-lg mb-8 max-w-xl mx-auto">
            Hubungi kami sekarang dan konsultasikan kebutuhan properti Anda secara gratis.
          </p>
          <Link href="/properti">
            <Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 gap-2">
              Mulai Cari Properti <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>

      <WhatsAppFAB />
    </div>
  )
}
