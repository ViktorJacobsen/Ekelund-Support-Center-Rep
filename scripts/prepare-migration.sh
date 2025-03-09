#!/bin/bash

# Skript för att förbereda MUI-migrering genom att skapa backup-kopior av originalfiler

echo "Förbereder MUI-migrering..."

# Skapa backup av rotlayout
if [ -f "src/app/layout.tsx" ]; then
  echo "Gör backup av src/app/layout.tsx -> src/app/layout.bak.tsx"
  cp src/app/layout.tsx src/app/layout.bak.tsx
fi

# Skapa backup av dashboard layout
if [ -f "src/app/(dashboard)/layout.tsx" ]; then
  echo "Gör backup av src/app/(dashboard)/layout.tsx -> src/app/(dashboard)/layout.bak.tsx"
  cp src/app/(dashboard)/layout.tsx src/app/(dashboard)/layout.bak.tsx
fi

# Skapa backup av dashboard page
if [ -f "src/app/(dashboard)/page.tsx" ]; then
  echo "Gör backup av src/app/(dashboard)/page.tsx -> src/app/(dashboard)/page.bak.tsx"
  cp src/app/(dashboard)/page.tsx src/app/(dashboard)/page.bak.tsx
fi

# Skapa backup av verktyg/matarinsamling page
if [ -f "src/app/(dashboard)/verktyg/matarinsamling/page.tsx" ]; then
  echo "Gör backup av src/app/(dashboard)/verktyg/matarinsamling/page.tsx -> src/app/(dashboard)/verktyg/matarinsamling/page.bak.tsx"
  cp src/app/(dashboard)/verktyg/matarinsamling/page.tsx src/app/(dashboard)/verktyg/matarinsamling/page.bak.tsx
fi

# Skapa backup av support-arenden page
if [ -f "src/app/(dashboard)/support-arenden/page.tsx" ]; then
  echo "Gör backup av src/app/(dashboard)/support-arenden/page.tsx -> src/app/(dashboard)/support-arenden/page.bak.tsx"
  cp src/app/(dashboard)/support-arenden/page.tsx src/app/(dashboard)/support-arenden/page.bak.tsx
fi

# Skapa backup av dokumentation page
if [ -f "src/app/(dashboard)/dokumentation/page.tsx" ]; then
  echo "Gör backup av src/app/(dashboard)/dokumentation/page.tsx -> src/app/(dashboard)/dokumentation/page.bak.tsx"
  cp src/app/(dashboard)/dokumentation/page.tsx src/app/(dashboard)/dokumentation/page.bak.tsx
fi

echo "Backup av originalfiler slutförd!"
echo "För att aktivera MUI, uppdatera src/lib/mui-config.ts och sätt useMUI = true"