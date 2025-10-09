import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ParticlesBackground from "@/app/components/particles-background";
import CustomCursor from "@/app/components/custom-cursor";
import BackToTop from "@/app/components/back-to-top";

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700']
})

export const metadata: Metadata = {
  title: 'Morgan Taylor - Full-Stack Developer',
  description: 'Full-Stack Developer & AI Enthusiast specializing in MERN stack, AI applications, and modern web animations',
}

export default function RootLayout({
                                     children,
                                   }: {
  children: React.ReactNode
}) {
  return (
      <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} bg-black text-gray-300 overflow-x-hidden cursor-none`}>
      <ParticlesBackground />
      <CustomCursor />
      <BackToTop />
      {children}
      </body>
      </html>
  )
}
