import Navbar from "@/components/Navbar";
import { montserrat, roboto, inter } from "./ui/fonts";
import "./ui/globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Liitec Platform",
  description: "Official website for Liitec Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${roboto.className} antialiased h-full bg-gray-50`}>
        <SessionAuthProvider>
            {children}
        </SessionAuthProvider>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
