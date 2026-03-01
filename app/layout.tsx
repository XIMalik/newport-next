import type { Metadata } from "next";
import { Playfair_Display, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Malik Awesu — Software Developer",
  description: "Building with clean architecture and thoughtful user experiences, blending performance with elegant design.",
  keywords: ["software developer", "fullstack developer", "web development", "React", "Next.js", "TypeScript", "Lagos", "Nigeria"],
  authors: [{ name: "Malik Awesu" }],
  openGraph: {
    title: "Malik Awesu — Software Developer",
    description: "Building with clean architecture and thoughtful user experiences, blending performance with elegant design.",
    type: "website",
    images: ["/favicon.ico"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Malik Awesu — Software Developer",
    description: "Building with clean architecture and thoughtful user experiences, blending performance with elegant design.",
    images: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${playfair.variable} ${sourceSerif.variable}`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
