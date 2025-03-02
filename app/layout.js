import "@style/globals.css"
import React from "react";
// import Footer from "@components/Footer"
// import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import Provider from '@components/Provider'
import Navbar from "@components/Navbar.jsx"
export const metadata = {
  title: "Shayer Khan",
  description: "Shayer Khan's Portfolio",
};
import { Toaster } from "@components/ui/toaster";
import GlowEffect from "@components/GlowEffect";
export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body>
        <Provider>
          <div className="main">
            
          </div>    
          <main className="app" >
            <Navbar/>
            {children}
            
          </main>
          <Toaster/>
        </Provider>

      </body>
      
    </html>
  );
}
