
import { montserrat, roboto, inter } from "./ui/fonts";
import "./ui/globals.css";
import SessionAuthProvider from "@/context/SessionAuthProvider";

import { Providers } from "./providers";

export const metadata = {
  title: "Liitec Platform",
  description: "Official website for Liitec Platform",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className=" bg-gray-50">
      <body className={`${roboto.className} antialiased bg-gray-50`}>
        <SessionAuthProvider>
          <Providers>
            {children}
          </Providers>
        </SessionAuthProvider>
      </body>
    </html>
  );
}
