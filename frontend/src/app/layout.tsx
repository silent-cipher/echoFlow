import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/contexts/AppContext";
import Notifications from "@/components/notification/Notifications";
import { NotificationContextProvider } from "@/contexts/NotificationContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Eth online hackathon 2024 StakeStream",
  description: "Eth online hackathon 2024 StakeStream",
  // icons: ["logo.jpg"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NotificationContextProvider>
          <AppContextProvider>
            <Notifications />
            {children}
          </AppContextProvider>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
