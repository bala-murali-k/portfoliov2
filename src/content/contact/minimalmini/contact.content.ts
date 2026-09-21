import type { ContactData } from '../contact.content';

export const contactMinimalMiniContent: ContactData = {
  header: {
    number: "",
    title: "Contact",
    tagline: "Start a conversation.",
    status: {
      isAvailable: true,
      label: "Available for freelance & full-time roles (2026)",
    },
  },
  channels: [
    {
      number: "",
      platform: "Email",
      value: "hello@yourdomain.com",
      href: "mailto:hello@yourdomain.com",
      note: "Response time: < 24 hrs",
    },
    {
      number: "",
      platform: "GitHub",
      value: "github.com/bala-murali-k",
      href: "https://github.com/bala-murali-k",
      note: "Source repositories & active builds",
    },
    {
      number: "",
      platform: "LinkedIn",
      value: "linkedin.com/in/yourhandle",
      href: "https://linkedin.com/in/yourhandle",
      note: "Career background & history",
    },
    {
      number: "",
      platform: "Cal.com",
      value: "30-Min Discovery Call",
      href: "https://cal.com/yourhandle/30min",
      note: "Direct booking",
    },
  ],
  meta: {
    location: "Tirunelveli, Tamil Nadu, India",
    timezone: "IST (UTC +5:30)",
  },
  labels: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send message",
  },
  successMessage: "Thanks for reaching out — I'll get back to you soon.",
};
