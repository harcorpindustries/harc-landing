"use client"

import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export const FooterNewsletter = () => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    // Backend integration can be added later.
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-md gap-2">
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        required
        autoComplete="email"
        className="h-9 flex-1 rounded-none border-0 border-b border-white/15 bg-transparent px-0 text-sm text-white shadow-none placeholder:text-white/30 focus-visible:border-cosmic focus-visible:ring-0"
      />
      <Button
        type="submit"
        variant="ghost"
        size="icon"
        className="size-9 shrink-0 rounded-full border border-white/10 text-white/50 hover:border-cosmic/40 hover:bg-cosmic/10 hover:text-white"
        aria-label="Subscribe to newsletter"
      >
        <ArrowRight className="size-4" />
      </Button>
    </form>
  )
}
