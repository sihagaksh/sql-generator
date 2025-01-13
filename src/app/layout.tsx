import type { Metadata } from "next";
import { Geist, Geist_Mono,Kodchasan } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/header/header";
// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

//use font kodchasan for the file

const kodchasan = Kodchasan({
  variable: "--font-kodchasan",
  subsets: ["latin"],
  weight: ["400", "700"]
})

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${kodchasan.variable} ${kodchasan.variable} antialiased`}
      >
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
