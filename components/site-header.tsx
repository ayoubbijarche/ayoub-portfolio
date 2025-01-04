import Link from "next/link"
import { Menu } from 'lucide-react'

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b bg-black/95 backdrop-blur supports-[backdrop-filter]:bg-black/60">
      <div className="container flex h-14 max-w-screen-2xl items-center">
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-start">
          <Link
            href="#"
            className="flex items-center space-x-2 text-sm font-medium text-white transition-colors hover:text-white/80"
          >
            BACK TO THE CLUB
          </Link>
          <nav className="hidden md:flex md:items-center md:space-x-6">
            <Link
              href="#"
              className="text-sm font-medium text-white transition-colors hover:text-white/80"
            >
              BAYC
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white transition-colors hover:text-white/80"
            >
              MAYC
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-white transition-colors hover:text-white/80"
            >
              BAKC
            </Link>
          </nav>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              className="mr-2 px-0 text-white hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden"
            >
              <Menu className="h-6 w-6" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black/95 text-white">
            <nav className="flex flex-col space-y-4">
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-white/80"
              >
                BAYC
              </Link>
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-white/80"
              >
                MAYC
              </Link>
              <Link
                href="#"
                className="text-sm font-medium transition-colors hover:text-white/80"
              >
                BAKC
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

