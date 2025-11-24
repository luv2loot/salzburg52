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

        {/* (Optional) Basic SEO tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#050509" />
      </head>

      <body className="app-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
