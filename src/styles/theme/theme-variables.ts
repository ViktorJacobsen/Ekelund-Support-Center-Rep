// Definierar alla temavariabler och CSS-klasser

/**
 * Temaklasser för applikationen.
 * Baserat på TailwindCSS och CSS-variabler för enkel anpassning.
 */
export const getThemeClasses = () => {
  return {
    // Core backgrounds
    bg: "bg-[hsl(var(--background))]",
    cardBg: "bg-[hsl(var(--card))]",
    popoverBg: "bg-[hsl(var(--popover))]",
    
    // Text colors
    text: "text-[hsl(var(--foreground))]",
    cardText: "text-[hsl(var(--card-foreground))]",
    mutedText: "text-[hsl(var(--muted-foreground))]",
    
    // Accent/Primary colors
    primary: "bg-[hsl(var(--primary))]", 
    primaryText: "text-[hsl(var(--primary))]",
    primaryFg: "text-[hsl(var(--primary-foreground))]",
    
    // Secondary colors
    secondary: "bg-[hsl(var(--secondary))]",
    secondaryText: "text-[hsl(var(--secondary-foreground))]",
    
    // Accent colors
    accent: "bg-[hsl(var(--accent))]",
    accentText: "text-[hsl(var(--accent-foreground))]",
    
    // Destructive colors
    destructive: "bg-[hsl(var(--destructive))]",
    destructiveText: "text-[hsl(var(--destructive))]",
    
    // Borders
    border: "border-[hsl(var(--border))]",
    
    // Hovers
    hoverBorder: "hover:border-[hsl(var(--primary))]",
    hoverText: "hover:text-[hsl(var(--primary))]",
    
    // Sidebar
    sidebarBg: "bg-[hsl(var(--secondary))]",
    sidebarText: "text-[hsl(var(--secondary-foreground))]",
    sidebarActiveText: "text-[hsl(var(--primary-foreground))]",
    sidebarSectionText: "text-[hsl(var(--muted-foreground))] uppercase text-xs font-semibold",
    
    // Other
    dividerColor: "bg-[hsl(var(--divider))]",
    
    // Primary button gradient
    primaryGradient: "from-[hsl(var(--primary))] to-[hsl(var(--primary)_/_0.8)]",

    // Typografi
    heading: "font-[var(--font-display)] font-semibold tracking-tight", 
    subheading: "font-[var(--font-display)] font-medium tracking-normal",
    bodyText: "font-[var(--font-sans)] text-base", 
    codeText: "font-[var(--font-mono)]",
    
    // Specifika varianter
    displayLarge: "font-[var(--font-display)] text-5xl md:text-6xl font-bold tracking-tighter",
    displayMedium: "font-[var(--font-display)] text-4xl md:text-5xl font-bold tracking-tight",
    displaySmall: "font-[var(--font-display)] text-3xl md:text-4xl font-semibold tracking-tight",
    
    // UI-text
    uiLabel: "font-[var(--font-sans)] font-medium",
    uiText: "font-[var(--font-sans)] text-sm",

    dividerBorder: "border-[hsl(var(--divider))]",
  };
};