import Navbar2 from "@/components/Navbar2";
import { montserrat, roboto, inter } from "./ui/fonts";
import "./ui/globals.css";
//import PrelineScript from "@/components/PrelineScript.tsx";
import SessionAuthProvider from "@/context/SessionAuthProvider";

//const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: "Liitec Platform",
  description: "Official website for Liitec Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${roboto.className} antialiased h-full`}>
        <SessionAuthProvider>
          <Navbar2 />
          <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
            {children}
          </div>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
