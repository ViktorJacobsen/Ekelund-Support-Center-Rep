import { Inter } from 'next/font/google'
import { Raleway } from 'next/font/google'
import { JetBrainsMono } from 'next/font/google'

// Konfigurera typsnitt med rätt undergrupper
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const raleway = Raleway({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-raleway',
  weight: ['300', '400', '500', '600', '700', '800'],
})

const jetBrainsMono = JetBrainsMono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${raleway.variable} ${jetBrainsMono.variable}`}>
      <body>{children}</body>
    </html>
  )
}