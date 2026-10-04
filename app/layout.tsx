import type { Metadata } from "next";
import { Bodoni_Moda, Inter } from "next/font/google";
import "./globals.css";

const bodoni = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://bridge-ai-os.com"),
  title: "Bridge AI OS — The Control Plane for AI Agent Fleets",
  description:
    "One control plane to run, schedule, observe, and govern every agent your team puts into production.",
  openGraph: {
    type: "website",
    url: "https://bridge-ai-os.com",
    siteName: "Bridge AI OS",
    title: "Bridge AI OS — The Control Plane for AI Agent Fleets",
    description:
      "One control plane to run, schedule, observe, and govern every agent your team puts into production.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Bridge AI OS — The Control Plane for AI Agent Fleets",
    description:
      "One control plane to run, schedule, observe, and govern every agent your team puts into production.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${bodoni.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}