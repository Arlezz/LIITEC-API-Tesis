import { montserrat, roboto, inter } from './ui/fonts'
import './ui/globals.css'

//const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Liitec Platform',
  description: 'Official website for Liitec Platform',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full bg-white">
      <body className={`${roboto.className} antialiased h-full`}>
        {children}
      </body>
    </html>
  )
}
