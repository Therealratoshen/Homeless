import { NextRequest, NextResponse } from 'next/server'
import { createAdminClient } from '@/lib/supabase/server'
import bcrypt from 'bcryptjs'

export async function POST(req: NextRequest) {
  const body = await req.json()
  if (body.secret !== process.env.SEED_SECRET && body.secret !== 'seed-properti-2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const supabase = await createAdminClient()

  // Create admin user
  const passwordHash = await bcrypt.hash('admin123', 10)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const adminClient = supabase as any
  await adminClient.from('admin_users').upsert({
    email: 'admin@propertipilihan.com',
    password_hash: passwordHash,
    name: 'Administrator',
  }, { onConflict: 'email' })

  // Seed properties
  const sampleProperties = [
    {
      title: 'Rumah Modern 2 Lantai di Kemang, Jakarta Selatan',
      slug: `rumah-modern-kemang-${Date.now()}`,
      description: 'Rumah minimalis modern dengan desain kontemporer. Terletak di kawasan premium Kemang dengan akses mudah ke jalan utama. Dilengkapi dengan AC central, smart home system, dan private garden.',
      price: 8_500_000_000,
      location: 'Jakarta Selatan',
      address: 'Jl. Kemang Raya No. 12, Kemang, Jakarta Selatan 12730',
      bedrooms: 4,
      bathrooms: 3,
      land_area: 300,
      building_area: 250,
      property_type: 'rumah',
      status: 'tersedia',
      fitur: ['AC Central', 'Smart Home', 'Garden', 'Parkir 2 Mobil', 'Keamanan 24 Jam', 'CCTV'],
      images: [
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      ],
    },
    {
      title: 'Apartemen Mewah 2 BR di SCBD, Jakarta Pusat',
      slug: `apartemen-sCBD-${Date.now() + 1}`,
      description: 'Apartemen 2 kamar tidur di kawasan bisnis SCBD dengan pemandangan kota Jakarta. Fasilitas lengkap: gym, pool, tennis court, dan shopping arcade. Cocok untuk eksekutif dan keluarga muda.',
      price: 4_200_000_000,
      location: 'Jakarta Pusat',
      address: 'Jl. Jend. Sudirman Kav. 52-53, SCBD, Jakarta Pusat',
      bedrooms: 2,
      bathrooms: 2,
      land_area: 0,
      building_area: 95,
      property_type: 'apartemen',
      status: 'tersedia',
      fitur: ['Gym', 'Swimming Pool', 'Tennis Court', 'Mall Integration', 'Concierge 24 Jam', 'City View'],
      images: [
        'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200&q=80',
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=1200&q=80',
      ],
    },
    {
      title: 'Villa Eksklusif dengan Private Pool di Bali',
      slug: `villa-bali-pool-${Date.now() + 2}`,
      description: 'Villa tropis 3 kamar tidur dengan private infinity pool dan pemandangan sawah. Desain open-plan dengan material lokal berkualitas. Perfect untuk vacation home atau investment property dengan yield 8% per tahun.',
      price: 12_000_000_000,
      location: 'Bali',
      address: 'Jl. Raya Ubud, Gianyar, Bali 80571',
      bedrooms: 3,
      bathrooms: 3,
      land_area: 800,
      building_area: 400,
      property_type: 'villa',
      status: 'tersedia',
      fitur: ['Private Pool', 'Outdoor Terrace', 'Chef Kitchen', 'Staff Quarter', 'Yoga Deck', 'Rice Field View'],
      images: [
        'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=1200&q=80',
        'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&q=80',
      ],
    },
    {
      title: 'Tanah Strategis 1000m² di Puncak, Bogor',
      slug: `tanah-puncak-bogor-${Date.now() + 3}`,
      description: 'Tanah kavling strategis di kawasan Puncak, Bogor dengan pemandangan Gunung Gede. Cocok untuk villa resort, glamping, atau agrowisata. Akses jalan asphalt, dekat dengan berbagai resort terkenal.',
      price: 2_500_000_000,
      location: 'Bogor',
      address: 'Jl. Raya Puncak Km. 80, Cipanas, Bogor 43253',
      bedrooms: 0,
      bathrooms: 0,
      land_area: 1000,
      building_area: 0,
      property_type: 'tanah',
      status: 'tersedia',
      fitur: ['View Gunung', 'Akses Jalan Utama', 'Dekat Resort', 'Listrik Ready', 'Air Spring'],
      images: [
        'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80',
      ],
    },
    {
      title: 'Ruko 3 Lantai di Pusat Bisnis Bandung',
      slug: `ruko-bandung-bisnis-${Date.now() + 4}`,
      description: 'Ruko 3 lantai siap pakai di kawasan bisnis strategis Bandung. Lokasi di Jalan Braga — pedestrian area dengan foot traffic tinggi. Cocok untuk F&B, retail, atau office. Tenant sudah ada (cafe).',
      price: 3_800_000_000,
      location: 'Bandung',
      address: 'Jl. Braga No. 45, Braga, Bandung 40111',
      bedrooms: 0,
      bathrooms: 2,
      land_area: 120,
      building_area: 280,
      property_type: 'ruko',
      status: 'tersedia',
      fitur: ['3 Lantai', 'SHM', 'Depan Jalan Braga', 'Tenant Aktif', 'Parkir Motor'],
      images: [
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
        'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80',
      ],
    },
    {
      title: 'Rumah Hook 3 Kamar di Gading Serpong, Tangerang',
      slug: `rumah-hook-gading-${Date.now() + 5}`,
      description: 'Rumah hook cluster eksklusif di Gading Serpong dengan posisi sudut. Hadap utara, tidak masuk angin. Kondisi bagus renovasi total 2023. Lingkungan asri dengan banyak ruang terbuka hijau.',
      price: 2_900_000_000,
      location: 'Tangerang',
      address: 'Jl. Boulevard成熟的 Gading Serpong, Tangerang 15810',
      bedrooms: 3,
      bathrooms: 2,
      land_area: 154,
      building_area: 180,
      property_type: 'rumah',
      status: 'tersedia',
      fitur: ['Hook / Corner', 'Renovasi 2023', 'Garden', 'Near School', 'Near Mall', 'Keamanan Cluster'],
      images: [
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=80',
      ],
    },
  ]

  for (const property of sampleProperties) {
    await adminClient.from('properties').insert(property)
  }

  return NextResponse.json({
    success: true,
    message: `Seeded 1 admin user + ${sampleProperties.length} properties`,
  })
}
