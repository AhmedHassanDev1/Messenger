import Providers from "../components/providers/index"
import "./globals.css"

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Providers>
         <body>
           {children}
         </body>
      </Providers>
    </html>
  )
}
