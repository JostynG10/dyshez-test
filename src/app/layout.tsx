import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "@styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Dyshez",
  description: "Next.JS Technical Test",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body>
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
