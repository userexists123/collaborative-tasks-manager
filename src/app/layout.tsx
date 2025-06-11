'use client';

import { Geist, Geist_Mono } from "next/font/google";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { TaskProvider } from "@/context/TaskContext";
import { Providers } from "./providers";
import NavBar from "@/components/Navbar";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Provider store={store}>
          <Providers>
            <NavBar />
            <TaskProvider>
              {children}
            </TaskProvider>
          </Providers>
        </Provider>
      </body>
    </html>
  );
}
