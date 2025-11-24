import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const metadata = {
  title: "Salzburg52 – Amir Ismaili",
  description:
    "Personal website of Amir Ismaili in Salzburg. Front office apprentice at HYPERION Hotel Salzburg."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google Search Console Verification */}
        <meta
          name="google-site-verification"
          content="BLcpIn7aBbclpXOlLBAxj2DZculO65iACJN4kcC20mc"
        />

        {/* Canonical URL */}
        <link rel="canonical" href="https://salzburg52.com" />

        {/* Basic meta */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050509" />

        {/* Structured data (JSON-LD) */}
        <script
          type="application/ld+json"
          // JSON must be injected as a string in JSX
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
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
