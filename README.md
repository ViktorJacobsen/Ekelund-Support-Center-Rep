# Ekelund Support Center

Ett internt supportcenter för Ekelund Styr, byggt på modern webbteknik med Next.js, Tailwind CSS, Supabase och IndexedDB för offline-stöd.

## Funktioner

- **Dokumenthantering**: Sök, filtrera och navigera i teknisk dokumentation
- **Offline-stöd**: Fungerar sömlöst även utan internetanslutning
- **Supportärenden**: Skapa och hantera supportärenden med uppföljning
- **Verktyg**: Inbyggda verktyg som mätaravläsning med kamerastöd
- **Avancerad sökning**: Kraftfull sökfunktion med taggstöd
- **Responsiv design**: Fungerar lika bra på mobil som på dator
- **Autentisering**: Användarhantering med olika behörighetsnivåer

## Teknisk översikt

### Frontend

- **Next.js**: React-ramverk för server-side rendering och moderna webbappar
- **Tailwind CSS**: Utility-first CSS-ramverk för snabb styling
- **ShadCN UI**: Komponentsystem baserat på Tailwind och Radix UI
- **TypeScript**: För typsäkerhet och bättre kodkvalitet

### Backend & Datalagring

- **Supabase**: Backend-as-a-Service med PostgreSQL-databas och autentisering
- **IndexedDB (via Dexie.js)**: Lokal databas för offline-funktionalitet
- **Tanstack Query**: Datahantering och caching
- **Workbox**: Service worker för ytterligare offline-stöd

### Autentisering

- **JWT-baserad autentisering**: Stödjer offline-autentisering
- **Supabase Auth**: Hantering av användarkonton och behörigheter
- **Row-Level Security**: Dataåtkomstkontroll på radnivå i Supabase

### Specialfunktioner

- **Tesseract.js**: OCR-teknik för att skanna mätar-ID med mobilkamera
- **Jimp & Sharp**: Bildbehandling för bättre OCR-resultat
- **SheetJS**: Excel-hantering för dataexport
- **JsPDF**: PDF-generering

## Installation

### Förutsättningar

- Node.js (v18+)
- pnpm, npm eller yarn
- Git
- Supabase-konto för serverhantering

### Steg för steg

1. Klona repot:
   ```bash
   git clone https://github.com/ekelund/support-center.git
   cd support-center
   ```

2. Installera beroenden:
   ```bash
   pnpm install
   ```

3. Skapa en `.env.local` fil i projektets rot med följande variabler:
   ```
   NEXT_PUBLIC_SUPABASE_URL=din_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=din_supabase_anon_key
   ```

4. Kör databasens migreringar i Supabase med SQL-skriptet som finns i `/database/schema.sql`

5. Starta utvecklingsmiljön:
   ```bash
   pnpm dev
   ```

6. Bygg för produktion:
   ```bash
   pnpm build
   ```

## Användning

### Första inloggningen

När systemet startas första gången finns det ingen administratörsanvändare. Skapa en användare via Supabase-konsolen med administratörsrollen.

### Användarroller

- **Admin**: Fullständig tillgång till alla funktioner
- **Contributor**: Kan skapa och redigera innehåll, hantera ärenden
- **Viewer**: Kan läsa innehåll och skapa egna supportärenden

### Offline-användning

Appen fungerar även offline efter första inladdningen. Ändringar som görs offline kommer att synkroniseras automatiskt när internetanslutningen återställs.

## Projektstruktur

```
src/
├── app/                         # Next.js app router
│   ├── (auth)/                  # Autentiseringsgrupp
│   │   ├── login/
│   │   └── register/
│   ├── (dashboard)/             # Dashboard-grupp
│   │   ├── layout.tsx           # Gemensam layout för dashboard
│   │   ├── page.tsx             # Huvudsida
│   │   ├── dokumentation/
│   │   ├── support-arenden/
│   │   └── verktyg/
│   ├── layout.tsx               # Rotlayout
│   └── page.tsx                 # Startsida
├── components/                  # Delade komponenter
│   ├── ui/                      # Bas-UI komponenter
│   ├── layout/                  # Layout-komponenter
│   ├── dashboard/               # Dashboard-specifika komponenter
│   └── animations/              # Animationskomponenter
├── hooks/                       # Anpassade React hooks
├── styles/                      # Styling
│   ├── theme/                   # Temarelaterade filer
│   └── globals.css              # Globala CSS-filer
├── lib/                         # Hjälpfunktioner och tjänster
│   ├── api/                     # API-klienter
│   ├── offline/                 # Offline-funktionalitet
│   └── utils/                   # Hjälpfunktioner
└── types/                       # TypeScript typdefinitioner
```

## Bidrag

1. Forka repot
2. Skapa en feature branch (`git checkout -b feature/amazing-feature`)
3. Commita dina ändringar (`git commit -m 'Add some amazing feature'`)
4. Pusha till din branch (`git push origin feature/amazing-feature`)
5. Öppna en Pull Request

## Licens

Detta projekt är utvecklat specifikt för Ekelund Styr och är inte tillgängligt för allmän användning utanför företaget.

## Kontakt

För frågor eller support, kontakta utvecklingsteamet: dev@ekelund-styr.se