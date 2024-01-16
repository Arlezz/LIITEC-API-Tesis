import Navbar from "@/components/Navbar"


export default function ClientLayout({children}) {
    return (
      <section>
        <Navbar />   
        {children}
      </section>
    )
}