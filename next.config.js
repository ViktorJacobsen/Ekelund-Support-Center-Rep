/** @type {import('next').NextConfig} */
const nextConfig = {
  // React strict mode för utveckling
  reactStrictMode: true,
  
  // Konfiguration för bilder
  images: {
    domains: [
      'localhost',
      // Lägg till domäner för Supabase Storage eller andra bildkällor
    ],
  },
  
  // Flyttat från experimental till root-nivå enligt Next.js 15 krav
  serverExternalPackages: [],
  
  // Experimentella funktioner har ändrats i nyare Next.js versioner
  experimental: {
    // Behåller bara giltiga experimentella funktioner
    optimizePackageImports: ['@/components'],
  },
};

module.exports = nextConfig;