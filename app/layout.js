import "./globals.css";

export const metadata = {
  title: "Salzburg52 – Amir Ismaili",
  description: "Personal website of Amir Ismaili in Salzburg. Multilingual, minimal, modern, and fun."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="app-body">
        {children}
      </body>
    </html>
  );
}
