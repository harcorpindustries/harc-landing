export const CONTACT_EMAIL = "contact@harcorp.ai" as const

export const CONTACT_MAILTO = `mailto:${CONTACT_EMAIL}` as const

export const CONTACT_COMPACT = {
  heading: "Let's Build What Comes Next",
  description:
    "For project inquiries, partnerships, collaborations, hiring, or general communication, reach out to Harcorp Industries.",
  cta: "Contact Us",
  ctaLink: CONTACT_MAILTO,
} as const

export const CONTACT_FULL = {
  heading: "Start a Conversation",
  subheading:
    "Have a project, partnership, or opportunity to discuss? Reach out to Harcorp Industries.",
  description: [
    "Harcorp Industries is open to conversations around technology projects, research collaborations, business partnerships, hiring, media, and strategic opportunities.",
    "If you would like to connect with us, please email us and our team will get back to you.",
  ],
  email: CONTACT_EMAIL,
  cta: "Contact Us",
  ctaLink: CONTACT_MAILTO,
  supportingText:
    "For project inquiries, partnerships, collaborations, and general communication, please contact us through the email below.",
} as const
