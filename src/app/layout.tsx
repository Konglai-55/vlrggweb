import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Toosy: Valorant Player Profile | VLR.gg",
  description: "Toosy Valorant player profile, teams, results, news and event placements.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css?family=Roboto:300,400,400italic,500,700,900"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
