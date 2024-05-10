import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Compost",
  description: "Your No-Bullshit Business Community",
  openGraph: {
    title: "Compost",
    image: "/seedling.jpg",
  },
  twitter: {
    title: "Compost | Your No-Bullshit Business Community ",
    description:
      "Your No-Bullshit Business Community.",
    image: "/seedling.png",
  },
  metadataBase: "http://www.compost.vercel.app/",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
