import type { Metadata } from "next";
import { Encode_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./_components/Navbar/Navbar";
import Footer from "./_components/Footer/Footer";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Toaster } from "react-hot-toast";
import UserProvider from "@/app/UserProvider";
import CountContextProvider from "@/app/CountProvider";
import NetworkStatus from "./_components/NetworkStatus/NetworkStatus";



const Encode_SansFont = Encode_Sans({
  subsets: ["latin"],
  weight: ["300", "900", "600"]
});

export const metadata: Metadata = {
  title: "EzyShop",
  description: "Discover ezyShop your one-stop online marketplace for all categories. From fashion and electronics to home essentials, we make shopping simple, fast, and affordable for everyone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={Encode_SansFont.className}>
        <UserProvider>
          <CountContextProvider>
            <NetworkStatus/>
              <Navbar />
          {children}
          <Toaster />
          <Footer />
          </CountContextProvider>
        </UserProvider>
      </body>
    </html>
  );
}
