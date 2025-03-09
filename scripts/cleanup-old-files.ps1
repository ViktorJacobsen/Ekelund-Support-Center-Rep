# PowerShell-skript för att ta bort gamla filer efter MUI-migrering

Write-Host "Rensar bort gamla filer efter MUI-migrering..." -ForegroundColor Cyan

# Ta bort backup-filer
Write-Host "Tar bort backup-filer..." -ForegroundColor Yellow
Get-ChildItem -Path "src" -Filter "*.bak.*" -Recurse -File | ForEach-Object {
    Write-Host "Tar bort: $($_.FullName)" -ForegroundColor Gray
    Remove-Item -Path $_.FullName -Force
}

# Ta bort gamla Tailwind UI-komponenter
Write-Host "Tar bort gamla UI-komponenter..." -ForegroundColor Yellow
$componentFiles = @(
    "src\components\ui\theme-*.tsx",
    "src\components\ui\simple-tooltip.tsx",
    "src\components\ui\status-badge.tsx"
)

foreach ($file in $componentFiles) {
    Get-ChildItem -Path $file -ErrorAction SilentlyContinue | ForEach-Object {
        Write-Host "Tar bort: $($_.FullName)" -ForegroundColor Gray
        Remove-Item -Path $_.FullName -Force
    }
}

# Ta bort gamla ursprungliga komponenter
Write-Host "Tar bort gamla komponenter..." -ForegroundColor Yellow
$oldComponents = @(
    "src\components\layout\header\header.tsx",
    "src\components\layout\header\search.tsx",
    "src\components\layout\sidebar\sidebar.tsx",
    "src\components\layout\sidebar\sidebar-*.tsx",
    "src\components\layout\tab-navigation.tsx",
    "src\components\support\ticket-form.tsx",
    "src\components\support\ticket-list.tsx",
    "src\components\tools\meter-form.tsx",
    "src\components\tools\camera-scanner.tsx"
)

foreach ($component in $oldComponents) {
    Get-ChildItem -Path $component -ErrorAction SilentlyContinue | ForEach-Object {
        Write-Host "Tar bort: $($_.FullName)" -ForegroundColor Gray
        Remove-Item -Path $_.FullName -Force
    }
}

# Ta bort gamla page-komponenter
Write-Host "Tar bort gamla page-komponenter..." -ForegroundColor Yellow
$oldPages = @(
    "src\app\(dashboard)\page.bak.tsx",
    "src\app\(dashboard)\layout.bak.tsx",
    "src\app\(dashboard)\components\original-dashboard.tsx",
    "src\app\(dashboard)\verktyg\matarinsamling\page.bak.tsx",
    "src\app\(dashboard)\support-arenden\page.bak.tsx",
    "src\app\(dashboard)\dokumentation\page.bak.tsx"
)

foreach ($page in $oldPages) {
    if (Test-Path $page) {
        Write-Host "Tar bort: $page" -ForegroundColor Gray
        Remove-Item -Path $page -Force
    }
}

Write-Host "Rensning klar!" -ForegroundColor Green
Write-Host "OBS: Kontrollera applikationen efter rensningen för att säkerställa att allt fungerar korrekt." -ForegroundColor Magenta