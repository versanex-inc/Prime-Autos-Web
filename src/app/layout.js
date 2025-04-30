/* eslint-disable react/no-unescaped-entities */
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ClientNav from "./Components/ClientNav";
import Footer from "./Components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Prime Autos",
  description: "Premium car poshish service in Pakistan",
  icons: {
    icon: ["/imgs/favicon/favicon.ico?v=4"],
    apple: ["imgs/favicon/apple-touch-icon.png?v=4"],
    shortcut: ["imgs/favicon/apple-touch-icon.png"],
  },
  verification: {
    google: "ozZ41ZOWAlxYbZTtbYIo4w-lH-R41y1eRCnowZKBbFk",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-gray-100`}
      >
        <ClientNav />
        {children}
        <Footer/>
      </body>
    </html>
  );
}
