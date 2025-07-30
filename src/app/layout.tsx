import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

// Wedibox Typography
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const lato = Lato({
  subsets: ["latin"],
  variable: "--font-lato",
  weight: ["100", "300", "400", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' ? 'https://wedibox.com' : 'http://localhost:3000'),
  title: "Wedibox - Your photos. Your guests. One perfect album.",
  description: "Create stunning photo albums for weddings, birthdays, and celebrations. Guests upload instantly via QR code. No apps required.",
  keywords: ["wedding photos", "photo sharing", "event albums", "QR code upload", "celebration memories"],
  authors: [{ name: "Wedibox Team" }],
  creator: "Wedibox",
  publisher: "Wedibox",
  openGraph: {
    title: "Wedibox - Photo Sharing for Celebrations",
    description: "Create stunning photo albums for weddings, birthdays, and celebrations. Guests upload instantly via QR code. No apps required.",
    url: "https://wedibox.com",
    siteName: "Wedibox",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Wedibox - Photo Sharing Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Wedibox - Photo Sharing for Celebrations",
    description: "Create stunning photo albums for weddings, birthdays, and celebrations. Guests upload instantly via QR code. No apps required.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfairDisplay.variable} ${lato.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#E8B4BC" />
      </head>
      <body
        className={`${playfairDisplay.variable} ${lato.variable} antialiased font-lato bg-wedibox-ivory text-gray-900`}
      >
        {children}
        <Toaster position="top-right" richColors />
      </body>
    </html>
  );
}