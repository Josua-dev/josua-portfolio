import type { Metadata } from "next";
import { Inter, Instrument_Serif, Source_Code_Pro } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  weight: "400",
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
});

const sourceCodePro = Source_Code_Pro({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Josua Uuyuni — Software Developer & AI Enthusiast · Windhoek, Namibia",
  description:
    "Software developer and AI enthusiast building real systems in Windhoek, Namibia — web, Android, software systems, and machine learning experiments. All on GitHub.",
  metadataBase: new URL("https://josua-portfolio-j4it.vercel.app"),
  openGraph: {
    title: "Josua Uuyuni — Software Developer & AI Enthusiast",
    description:
      "Software developer and AI enthusiast building real systems — web, Android, and machine learning.",
    url: "https://josua-portfolio-j4it.vercel.app",
    siteName: "Josua Uuyuni",
    locale: "en_NA",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Josua Uuyuni — Software Developer & AI Enthusiast",
    description:
      "Software developer and AI enthusiast building real systems in Windhoek, Namibia.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${sourceCodePro.variable}`}
    >
      <head>
        {/* Marks the page as JS-enabled so reveal targets are hidden only when
            JS runs; without this, content stays visible with no JS. */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>{children}</body>
    </html>
  );
}