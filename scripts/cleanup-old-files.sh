#!/bin/bash

# Skript för att ta bort gamla filer efter MUI-migrering

echo "Rensar bort gamla filer efter MUI-migrering..."

# Ta bort backup-filer
echo "Tar bort backup-filer..."
find src -name "*.bak.*" -type f -delete

# Ta bort gamla Tailwind UI-komponenter
echo "Tar bort gamla UI-komponenter..."
rm -rf src/components/ui/theme-*.tsx
rm -rf src/components/ui/simple-tooltip.tsx
rm -rf src/components/ui/status-badge.tsx

# Ta bort gamla ursprungliga komponenter
echo "Tar bort gamla komponenter..."
rm -rf src/components/layout/header/header.tsx
rm -rf src/components/layout/header/search.tsx
rm -rf src/components/layout/sidebar/sidebar.tsx
rm -rf src/components/layout/sidebar/sidebar-*.tsx
rm -rf src/components/layout/tab-navigation.tsx

rm -rf src/components/support/ticket-form.tsx
rm -rf src/components/support/ticket-list.tsx

rm -rf src/components/tools/meter-form.tsx
rm -rf src/components/tools/camera-scanner.tsx

# Ta bort gamla page-komponenter
echo "Tar bort gamla page-komponenter..."
rm -rf src/app/\(dashboard\)/page.bak.tsx
rm -rf src/app/\(dashboard\)/layout.bak.tsx
rm -rf src/app/\(dashboard\)/components/original-dashboard.tsx
rm -rf src/app/\(dashboard\)/verktyg/matarinsamling/page.bak.tsx
rm -rf src/app/\(dashboard\)/support-arenden/page.bak.tsx
rm -rf src/app/\(dashboard\)/dokumentation/page.bak.tsx

echo "Rensning klar!"
echo "OBS: Kontrollera applikationen efter rensningen för att säkerställa att allt fungerar korrekt."