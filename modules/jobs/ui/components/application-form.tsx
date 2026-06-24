"use client"

import { type FormEvent, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  APPLICATION_EMAIL,
  APPLICATION_FORM,
  APPLICATION_SUBJECT,
} from "@/modules/jobs/content"
import { cn } from "@/lib/utils"
import { Send } from "lucide-react"

const fieldClassName =
  "border-white/12 bg-white/4 text-white placeholder:text-white/35 focus-visible:border-violet-500/40 focus-visible:ring-violet-500/20"

const labelClassName =
  "text-xs font-medium uppercase tracking-[0.14em] text-white/45"

export function ApplicationForm() {
  const [role, setRole] = useState<string>(APPLICATION_FORM.roleOptions[0])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)

    const lines = [
      `Full Name: ${data.get("fullName")}`,
      `Email: ${data.get("email")}`,
      `Phone: ${data.get("phone")}`,
      `Role Applying For: ${data.get("role")}`,
      `Current Location: ${data.get("location")}`,
      `LinkedIn: ${data.get("linkedin") || "—"}`,
      `GitHub / Portfolio / Website: ${data.get("portfolio") || "—"}`,
      "",
      "Message:",
      String(data.get("message") || ""),
      "",
      "—",
      "Please attach your resume to this email before sending.",
    ]

    const subject = encodeURIComponent(
      data.get("role") === "Other / General Application"
        ? APPLICATION_SUBJECT
        : `Application for ${data.get("role")} — Harcorp Industries`,
    )
    const body = encodeURIComponent(lines.join("\n"))
    window.location.href = `mailto:${APPLICATION_EMAIL}?subject=${subject}&body=${body}`
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="fullName" className={labelClassName}>
            Full Name
          </label>
          <Input
            id="fullName"
            name="fullName"
            required
            autoComplete="name"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className={labelClassName}>
            Email Address
          </label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="phone" className={labelClassName}>
            Phone Number
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            required
            autoComplete="tel"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="role" className={labelClassName}>
            Role Applying For
          </label>
          <select
            id="role"
            name="role"
            required
            value={role}
            onChange={(event) => setRole(event.target.value)}
            className={cn(
              "flex h-9 w-full rounded-lg border px-3 text-sm outline-none transition-colors",
              fieldClassName,
            )}
          >
            {APPLICATION_FORM.roleOptions.map((option) => (
              <option
                key={option}
                value={option}
                className="bg-background text-foreground"
              >
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className={labelClassName}>
            Current Location
          </label>
          <Input
            id="location"
            name="location"
            required
            autoComplete="address-level2"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="linkedin" className={labelClassName}>
            LinkedIn Profile
          </label>
          <Input
            id="linkedin"
            name="linkedin"
            type="url"
            placeholder="https://linkedin.com/in/..."
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="portfolio" className={labelClassName}>
            GitHub / Portfolio / Website
          </label>
          <Input
            id="portfolio"
            name="portfolio"
            type="url"
            placeholder="https://"
            className={fieldClassName}
          />
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="resume" className={labelClassName}>
            Resume Upload
          </label>
          <Input
            id="resume"
            name="resume"
            type="file"
            accept=".pdf,.doc,.docx"
            className={cn(
              fieldClassName,
              "cursor-pointer file:mr-3 file:rounded-md file:border-0 file:bg-white/10 file:px-3 file:py-1 file:text-xs file:text-white/80",
            )}
          />
          <p className="text-xs text-white/35">
            Your file will not be sent automatically. Attach it in your email
            client after the form opens.
          </p>
        </div>

        <div className="space-y-2 sm:col-span-2">
          <label htmlFor="message" className={labelClassName}>
            Short Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            rows={5}
            placeholder={APPLICATION_FORM.messagePlaceholder}
            className={cn(
              "flex w-full resize-y rounded-lg border px-3 py-2 text-sm outline-none transition-colors",
              fieldClassName,
            )}
          />
        </div>
      </div>

      <Button
        type="submit"
        size="lg"
        className="w-full cursor-pointer transition-transform duration-300 hover:scale-[1.02] active:scale-[0.98] sm:w-auto"
      >
        Send Application
        <Send className="size-4" />
      </Button>
    </form>
  )
}
