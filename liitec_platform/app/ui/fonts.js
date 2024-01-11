import { Montserrat, Roboto, Inter } from 'next/font/google'

export const montserrat = Montserrat({ 
    subsets: ['latin'] 
});
export const roboto = Roboto({ 
    subsets: ['latin'],
    weight:  ['300', '400', '500', '700']
});
export const inter = Inter({
    subsets: ['latin']
});
