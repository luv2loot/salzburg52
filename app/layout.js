import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/ThemeProvider";
import DynamicMusicPlayer from "@/components/DynamicMusicPlayer";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  weight: ['300', '400', '500', '600', '700'],
});

export const metadata = {
  title: "Salzburg52 – Amir Ismaili",
  description:
    "Personal website of Amir Ismaili in Salzburg. Front office apprentice at HYPERION Hotel Salzburg."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var path = window.location.pathname;
                var langMatch = path.match(/^\\/(en|de|fr|es|it)(\\/|$)/);
                if (langMatch) {
                  document.documentElement.lang = langMatch[1];
                }
              })();
            `,
          }}
        />
        <meta name="google-site-verification" content="BLcpIn7aBbclpXOlLBAxj2DZculO65iACJN4kcC20mc" />

        <link rel="canonical" href="https://salzburg52.com" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050509" />

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Amir Ismaili",
              jobTitle: "Front office apprentice",
              url: "https://salzburg52.com",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Salzburg",
                addressCountry: "Austria"
              }
            })
          }}
        />
      </head>

      <body className="app-body">
        <DynamicMusicPlayer />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
