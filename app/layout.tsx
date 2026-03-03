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
  metadataBase: new URL("https://malikawesu.com.ng"),

  title: {
    default: "Malik Awesu | Fullstack Developer",
    template: "%s | Malik Awesu",
  },

  description:
    "Building with clean architecture and thoughtful user experiences, blending performance with elegant design.",

  keywords: [
    "software developer",
    "fullstack developer",
    "web development",
    "python",
    "django",
    "React",
    "Next.js",
    "TypeScript",
    "Lagos",
    "Nigeria",
    "abdulmalik", 
    "awesu",
    "abdulmalik awesu",
    "malik awesu",
    "malik"
  ],

  authors: [{ name: "Abdulmalik Awesu" }],

  openGraph: {
    title: "Malik Awesu | Fullstack Developer",
    description:
      "Building with clean architecture and thoughtful user experiences, blending performance with elegant design.",
    url: "https://malikawesu.com.ng",
    siteName: "Malik Awesu",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/m.jpg", // uses metadataBase
        width: 1200,
        height: 630,
        alt: "Malik Awesu Portfolio Preview",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Malik Awesu | Fullstack Developer",
    description:
      "Building with clean architecture and thoughtful user experiences, blending performance with elegant design.",
    images: ["/m.jpg"],
  },

  icons: {
    icon: "/favicon.ico",
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
