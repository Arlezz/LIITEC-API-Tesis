import Navbar from "@/components/Navbar";
import { montserrat, roboto, inter } from "./ui/fonts";
import "./ui/globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";


export const metadata = {
  title: "Liitec Platform",
  description: "Official website for Liitec Platform",
};

export default function RootLayout({ children }) {    
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${roboto.className} antialiased h-full`}>
        <SessionAuthProvider>
          <Navbar />
          {/* <div className="max-w-[85rem] w-full mx-auto p-4 sm:flex sm:items-center sm:justify-between">
            
          </div> */}
          {children}
        </SessionAuthProvider>
        {/* <PrelineScript /> */}
      </body>
    </html>
  );
}
