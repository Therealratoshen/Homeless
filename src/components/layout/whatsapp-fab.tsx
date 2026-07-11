'use client'

import { MessageCircle } from 'lucide-react'

export function WhatsAppFAB() {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '6281234567890'
  const message = encodeURIComponent('Halo, saya tertarik dengan properti di PropertiPilihan. Boleh minta informasi lebih lanjut?')
  const waUrl = `https://wa.me/${number.replace(/[^0-9]/g, '')}?text=${message}`

  return (
    <a
      href={waUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105"
    >
      <MessageCircle className="h-7 w-7" fill="white" />
    </a>
  )
}
