import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import MusicPlayer from "@/components/MusicPlayer";

export const metadata = {
  title: "Salzburg52 – Amir Ismaili",
  description:
    "Personal website of Amir Ismaili in Salzburg. Front office apprentice at HYPERION Hotel Salzburg."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
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
        <MusicPlayer />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
