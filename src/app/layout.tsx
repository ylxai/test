import { Providers } from "@/components/providers"; 
import "@/styles/globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover" />
      </head>
      <body className="bg-white text-gray-900 antialiased">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}