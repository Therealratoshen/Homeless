# PropertiPilihan — Platform Properti Indonesia

Platform properti lengkap dengan halaman publik untuk pengunjung dan dashboard admin internal. Dibangun dengan Next.js 15, Supabase, dan NextAuth.js.

## Fitur

### Situs Publik
- **Beranda**: Hero section, properti pilihan, statistik, keunggulan
- **Daftar Properti**: Filter multi-dimensi (tipe, status, range harga), pencarian, pagination
- **Detail Properti**: Galeri foto, spesifikasi, tombol WhatsApp + Telepon, badge status
- **WhatsApp FAB**: Tombol mengambang untuk kontak cepat

### Dashboard Admin
- **Dashboard**: Statistik, properti terbaru
- **Kelola Properti**: List, edit, hapus dengan pencarian
- **Tambah/Edit Properti**: Form lengkap dengan upload gambar ke Supabase Storage
- **Autentikasi**: Login dengan email/password (NextAuth.js)

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Bahasa**: TypeScript
- **Styling**: Tailwind CSS v4 + shadcn/ui v4
- **Database & Storage**: Supabase
- **Auth**: NextAuth.js (credentials provider)
- **Deployment**: Vercel

## Setup

### 1. Buat Project Supabase
1. Buka [supabase.com](https://supabase.com) → Create Project
2. Buka **SQL Editor** → jalankan semua query dari `supabase/migrations/001_initial.sql`
3. Di **Settings → API** → salin:
   - `Project URL`
   - `anon/public` key
   - `service_role` secret

### 2. Set Environment Variables (Vercel)
```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXTAUTH_SECRET=<generate: openssl rand -base64 32>
NEXTAUTH_URL=https://your-domain.com
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
```

### 3. Deploy ke Vercel
```bash
npm install
npm run build
# Deploy via Vercel CLI or GitHub integration
```

### 4. Seed Data
```bash
curl -X POST 'https://your-domain.com/api/admin/seed?secret=seed-properti-2024'
```
Ini akan membuat:
- Admin user: `admin@propertipilihan.com` / `admin123`
- 6 properti sample dengan foto dari Unsplash

### 5. Login Admin
Buka `/admin/login` → login dengan kredensial di atas.

## Struktur Database

### `properties`
| Kolom | Tipe | Deskripsi |
|-------|------|-----------|
| id | uuid | Primary key |
| title | text | Judul properti |
| slug | text | URL-friendly slug (unique) |
| description | text | Deskripsi lengkap |
| price | bigint | Harga dalam Rupiah |
| location | text | Kota/lokasi |
| address | text | Alamat lengkap |
| bedrooms | int | Jumlah kamar tidur |
| bathrooms | int | Jumlah kamar mandi |
| land_area | int | Luas tanah (m²) |
| building_area | int | Luas bangunan (m²) |
| property_type | text | rumah/apartemen/villa/tanah/ruko |
| status | text | tersedia/terjual/disewa |
| fitur | text[] | Array fasilitas |
| images | text[] | Array URL gambar |
| created_at | timestamptz | Waktu dibuat |
| updated_at | timestamptz | Waktu diupdate |

### `admin_users`
| Kolom | Tipe |
|-------|------|
| id | uuid |
| email | text (unique) |
| password_hash | text (bcrypt) |
| name | text |
| created_at | timestamptz |

## API Routes

| Route | Method | Deskripsi |
|-------|--------|-----------|
| `/api/properties` | GET | List properti dengan filter |
| `/api/properties` | POST | Tambah properti (auth) |
| `/api/properties/[slug]` | GET | Detail properti |
| `/api/properties/[slug]` | PUT | Update properti (auth) |
| `/api/properties/[slug]` | DELETE | Hapus properti (auth) |
| `/api/admin/seed` | POST | Seed admin + sample data |
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handlers |

## Catatan Development

### TypeScript dengan Supabase
Supabase v2 TypeScript generics tidak sepenuhnya kompatibel dengan custom `Database` type. Casting `as any` digunakan di beberapa tempat — aplikasi berjalan dengan benar di runtime.

### Tailwind CSS v4
Project ini menggunakan Tailwind CSS v4 (bukan v3). Konfigurasi menggunakan CSS variables dengan `@theme` directive.

### shadcn/ui v4
shadcn/ui v4 menggunakan `@base-ui/react` bukan `@radix-ui/react`. Menggunakan `render` prop bukan `asChild` untuk composable components.
