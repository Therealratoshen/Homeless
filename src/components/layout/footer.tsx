import Link from 'next/link'
import { Building2, MapPin, Phone, Mail } from 'lucide-react'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 font-bold text-xl text-white mb-4">
              <Building2 className="h-6 w-6 text-blue-400" />
              <span>PropertiPilihan</span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-md">
              Platform properti terpercaya untuk menemukan rumah, apartemen, villa, dan tanah
              di seluruh Indonesia. Kami membantu Anda menemukan pilihan terbaik dengan harga
              yang transparan.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-white mb-4">Tautan Cepat</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Beranda</Link></li>
              <li><Link href="/properti" className="hover:text-blue-400 transition-colors">Properti</Link></li>
              <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Admin</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-white mb-4">Kontak</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-blue-400" />
                Jakarta, Indonesia
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-blue-400" />
                +62 812 3456 7890
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-blue-400" />
                info@propertipilihan.com
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-6 text-center text-sm text-slate-500">
          © {new Date().getFullYear()} PropertiPilihan. Hak cipta dilindungi.
        </div>
      </div>
    </footer>
  )
}
