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
      <body className="app-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
