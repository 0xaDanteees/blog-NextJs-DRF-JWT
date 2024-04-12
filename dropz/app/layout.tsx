import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/auth/Navbar";
import { getAuthSession } from "@/lib/nextauth";
import AuthProvider from "@/components/providers/AuthProvider";
import { Toaster } from 'sonner';
import { ThemeProvider } from "@/components/providers/theme-provider";

const inter = Inter({ subsets: ["latin"] });


export const metadata: Metadata = {
  title: "BLOGZ",
  description: "Create stories",
  icons: {
    icon: '/dropzLogo.png',
  }
};

interface RootLayoutProps {
  children: React.ReactNode
}


const RootLayout = async ({ children }: RootLayoutProps) => {

  const user= await getAuthSession()


  return (
    <html lang="en">
      <body className={inter.className}>
        
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
          <div className="flex min-h-screen flex-col">
            <Navbar user={user}/>
            <main className="container mx-auto max-w-screen-md flex-1 px-2 py-24">
              {children}
              <Toaster />
            </main>
            <footer className="py-5">
              <div className="text-center text-sm">
                Copyright © All rights reserved |{" "}
                <a
                  href="https://github.com/0xaDanteees"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  0xâDanteees
                </a>
              </div>
            </footer>
          </div>
          </ThemeProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}

export default RootLayout;