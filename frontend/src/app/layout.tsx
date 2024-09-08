import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "@/components/header/Header";
import Footer from "@/components/footer/Footer";
import { AppContextProvider } from "@/contexts/AppContext";
import Notifications from "@/components/notification/Notifications";
import { NotificationContextProvider } from "@/contexts/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Echo Flow",
  description: "Eth online hackathon 2024 Echo Flow",
  icons: ["logo.png"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scrollbar-hide">
      <body className={inter.className}>
        <NotificationContextProvider>
          <AppContextProvider>
            <Notifications />
            <Providers>
              <Header />
              {children}
            </Providers>
            <Footer />
          </AppContextProvider>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
