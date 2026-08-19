import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toosy: Valorant Player Profile | VLR.gg",
  description: "Toosy Valorant player profile, teams, results, news and event placements.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body>{children}</body></html>;
}
