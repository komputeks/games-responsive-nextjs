import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Games — Enter the Arena",
  description: "Discover the next generation of immersive games and unforgettable adventures.",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
