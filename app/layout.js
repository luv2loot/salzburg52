import "./globals.css";

export const metadata = {
  title: "Salzburg52 – Amir Ismaili",
  description:
    "Personal website of Amir Ismaili in Salzburg. Front office apprentice at HYPERION Hotel Salzburg."
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="theme-dark">
      <body className="app-body">
        {children}
      </body>
    </html>
  );
}
