# Tema-systemet i Ekelund Support Center

Detta dokument beskriver hur tema-systemet är uppbyggt och hur du bör använda det för att skapa konsistenta UI-komponenter.

## Grundprinciper

1. **Temafärger framför direkta färger** - Använd alltid `themeClasses` istället för direkta färgklasser som `bg-blue-500`
2. **Återanvändbara komponenter** - Använd de fördefinierade tema-komponenterna när det är möjligt
3. **Konsekvent UI** - Alla komponenter ska se likadana ut och reagera på temabyte på samma sätt

## Hur du använder tema-systemet

### 1. Hämta tema-inställningar i komponenter

```tsx
import { useTheme } from "@/styles/theme/theme-context";

function MinKomponent() {
  const { themeClasses, darkMode, toggleTheme } = useTheme();

  return (
    <div className={`${themeClasses.cardBg} ${themeClasses.text}`}>
      Temakonsekvent innehåll
    </div>
  );
}
```

### 2. Fördefinierade tema-komponenter

Använd våra fördefinierade tema-komponenter istället för att skriva egna stilar:

- `ThemeButton` - För alla knappar
- `ThemeCard` - För alla kort/rutor
- `ThemeBadge` - För badges och taggar
- `StatusBadge` - För statusindikatorer
- `SidebarItem` - För sidebar-navigeringsobjekt
- `SidebarTooltip` - För tooltips i sidebaren

### 3. De viktigaste tema-klasserna

```
themeClasses.bg - Bakgrundsfärg
themeClasses.text - Textfärg
themeClasses.cardBg - Kortbakgrund
themeClasses.border - Kantlinjefärg
themeClasses.primary - Primärfärg bakgrund
themeClasses.primaryText - Primärfärg text
themeClasses.primaryFg - Text på primärfärg bakgrund
themeClasses.mutedText - Nedtonad text
themeClasses.secondary - Sekundär bakgrundsfärg
themeClasses.secondaryText - Text på sekundär bakgrund
```

### 4. Använd tema-utils för vanliga uppgifter

```tsx
import { getStatusColor, formatDate, formatFileSize } from '@/lib/theme-utils';

// Statusfärg
<span className={`rounded-full ${getStatusColor('online')}`}></span>

// Datum
<span>{formatDate(document.createdAt, 'medium')}</span>

// Filstorlek
<span>{formatFileSize(file.size)}</span>
```

## Att tänka på

1. **Undvik direkta färgklasser** - Använd aldrig klasser som `bg-blue-500` eller `text-green-600`
2. **Kontrollera kontrast** - Se till att text är läsbar mot bakgrunden i både ljust och mörkt läge
3. **Testa i båda lägena** - Kontrollera alltid hur komponenten ser ut i både ljust och mörkt tema
4. **Återanvänd istället för att återuppfinna** - Använd befintliga tema-komponenter istället för att skapa nya

## CSS-variabler

Tema-systemet bygger på CSS-variabler som definieras i `globals.css`. För referens:

```css
:root {
  --background: 218 32% 100%;
  --foreground: 218 5% 10%;
  --card: 218 32% 100%;
  --card-foreground: 218 5% 15%;
  --primary: 218 81% 34%;
  --primary-foreground: 0 0% 100%;
  /* osv... */
}

.dark {
  --background: 216 37% 8%;
  --foreground: 218 5% 100%;
  /* osv... */
}
```

Dessa variabler används med Tailwinds HSL-syntax: `bg-[hsl(var(--primary))]`
