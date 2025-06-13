/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // para asegurarte de que todos los archivos JSX y TSX sean escaneados
  ],
  theme: {
    extend: {
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'flip': 'flip 1s ease-in-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(360deg)' },
        }
      },
      colors: {
        background: "rgb(var(--background))",
        foreground: "rgb(var(--foreground) / <alpha-value>)",
        card: "rgb(var(--card) / <alpha-value>)",
        'card-foreground': "rgb(var(--card-foreground) / <alpha-value>)",
        popover: "rgb(var(--popover) / <alpha-value>)",
        'popover-foreground': "rgb(var(--popover-foreground) / <alpha-value>)",
        primary: "rgb(var(--primary) / <alpha-value>)",
        'primary-foreground': "rgb(var(--primary-foreground) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        'secondary-foreground': "rgb(var(--secondary-foreground) / <alpha-value>)",
        muted: "rgb(var(--muted) / <alpha-value>)",
        'muted-foreground': "rgb(var(--muted-foreground) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        'accent-foreground': "rgb(var(--accent-foreground) / <alpha-value>)",
        destructive: "rgb(var(--destructive) / <alpha-value>)",
        'destructive-foreground': "rgb(var(--destructive-foreground) / <alpha-value>)",
        warning: "rgb(var(--warning) / <alpha-value>)",
        'warning-foreground': "rgb(var(--warning-foreground) / <alpha-value>)",
        success: "rgb(var(--success) / <alpha-value>)",
        'success-foreground': "rgb(var(--success-foreground) / <alpha-value>)",
        info: "rgb(var(--info) / <alpha-value>)",
        'info-foreground': "rgb(var(--info-foreground) / <alpha-value>)",
        border: "rgb(var(--border) / <alpha-value>)",
        input: "rgb(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",

        // Sidebar
        sidebar: "rgb(var(--sidebar) / <alpha-value>)",
        'sidebar-foreground': "rgb(var(--sidebar-foreground) / <alpha-value>)",
        'sidebar-primary': "rgb(var(--sidebar-primary) / <alpha-value>)",
        'sidebar-primary-foreground': "rgb(var(--sidebar-primary-foreground) / <alpha-value>)",
        'sidebar-accent': "rgb(var(--sidebar-accent) / <alpha-value>)",
        'sidebar-accent-foreground': "rgb(var(--sidebar-accent-foreground) / <alpha-value>)",
        'sidebar-border': "rgb(var(--sidebar-border) / <alpha-value>)",
        'sidebar-ring': "rgb(var(--sidebar-ring) / <alpha-value>)",
      },
      borderRadius: {
        sm: "var(--radius-sm)",
        md: "var(--radius-md)",
        lg: "var(--radius-lg)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
  darkMode: 'class', // o 'media' si prefieres detectar el sistema
};
