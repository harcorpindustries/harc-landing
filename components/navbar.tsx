"use client"
import Link from "next/link"
import Image from "next/image"
import { motion, useReducedMotion } from "framer-motion"
import { Button } from "./ui/button"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { Menu, X } from "lucide-react"
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from "./ui/sheet"
import { EASE_OUT } from "@/lib/motion"
export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduced = useReducedMotion()
  const pathname = usePathname()
  const isActive = (href: string) => pathname === href

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])
  const contactHref = pathname === "/about" ? "/about#contact" : "/#contact"
  const navItems = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "About",
      href: "/about",
    },
    {
      label: "Projects",
      href: "/#projects",
    },
    {
      label: "Jobs",
      href: "/jobs",
    },
    {
      label: "News",
      href: "/news",
    },
    {
      label: "Contact",
      href: contactHref,
    },
  ]
  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <motion.nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 border-b py-4 transition-all duration-500",
        scrolled
          ? "border-white/10 bg-white/4 py-3 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.08),0_8px_32px_-8px_rgba(0,0,0,0.45)] backdrop-blur-2xl backdrop-saturate-150 supports-backdrop-filter:bg-white/3"
          : "border-transparent bg-white/2 backdrop-blur-md backdrop-saturate-150",
      )}
      initial={reduced ? false : { y: -20, opacity: 0 }}
      animate={reduced ? undefined : { y: 0, opacity: 1 }}
      transition={{ duration: 0.55, ease: EASE_OUT }}
    >
      <div className="page-container flex items-center justify-between">
        <Link href="/" className="shrink-0">
          <Image
            src="/logo.png"
            alt="Harcorp Industries"
            width={160}
            height={160}
            className="h-10 w-auto sm:h-11"
          />
        </Link>
        <div className="hidden items-center gap-x-6 md:flex">
          {
            navItems.map((item, index) => (
              <motion.div
                key={item.href}
                initial={reduced ? false : { opacity: 0, y: -8 }}
                animate={reduced ? undefined : { opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.08 + index * 0.05, ease: EASE_OUT }}
              >
                <Link href={item.href} className={cn("text-sm font-medium text-white/70 transition-colors hover:text-white", isActive(item.href) && "text-white")}>
                  {item.label}
                </Link>
              </motion.div>
            ))
          }
        </div>
        <div className="flex items-center gap-2">
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.95 }}
            animate={reduced ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.35, ease: EASE_OUT }}
          >
            <Link href={contactHref} onClick={() => setIsOpen(false)}>
              <Button className="transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] md:px-4">
                <span className="hidden md:inline">Contact Us</span>
                <span className="md:hidden">Contact</span>
              </Button>
            </Link>
          </motion.div>
          <Button className="md:hidden" onClick={toggleMenu} size="icon" variant="ghost">
            {isOpen ? <X className="size-6 text-white" /> : <Menu className="size-6 text-white" />}
          </Button>
        </div>
      </div>

      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetContent side="bottom" className="p-0">
          <SheetHeader>
            <SheetTitle className="sr-only">Navigation menu</SheetTitle>
            <Image src="/logo.png" alt="Harcorp Industries" width={200} height={200} />
          </SheetHeader>
          {
            navItems.map((item) => (
              <Link
                href={item.href}
                key={item.href}
                className={cn("text-white/70 hover:text-white transition-colors font-medium pl-6", isActive(item.href) && "text-white")}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))
          }
          <SheetFooter>
            <Link href={contactHref} className="w-full" onClick={() => setIsOpen(false)}>
              <Button className="w-full">
                Contact Us
              </Button>
            </Link>
          </SheetFooter>
        </SheetContent>
      </Sheet>


    </motion.nav>
  )
}
