import { ContactData } from '../contact.content';

export const contactTerminalContent: ContactData = {
  header: {
    number: "05",
    title: "GET IN TOUCH",
    tagline: "Let's collaborate on your next big release.",
    status: {
      isAvailable: true,
      label: "Open to advisory & engineering roles",
    },
  },
  channels: [
    {
      number: "01",
      platform: "Email",
      value: "developer@example.com",
      href: "mailto:developer@example.com",
      note: "Async-first communication",
    },
    {
      number: "02",
      platform: "GitHub",
      value: "github.com/bala-murali-k",
      href: "https://github.com/bala-murali-k",
    },
    {
      number: "03",
      platform: "LinkedIn",
      value: "linkedin.com/in/yourhandle",
      href: "https://linkedin.com/in/yourhandle",
    },
  ],
  meta: {
    location: "Remote / India",
    timezone: "UTC +5:30",
  },
  labels: {
    name: "Name",
    email: "Email",
    message: "Message",
    submit: "Send message",
  },
  successMessage: "Message received — thanks for reaching out.",
};

