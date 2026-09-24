import emailjs from '@emailjs/browser'

export function truncate(str: string | undefined | null, max: number = 100): string {
  if (!str) return '';
  return str.length > max ? `${str.slice(0, max)}...` : str;
}

export async function submitContact(name: string, email: string, subject: string, message: string) {
  try {
      const templateParams = {
          to_name: 'Bala',
          from_name: name,
          name: name,
          email: email,
          subject: subject,
          message: message,
          title: subject,
          reply_to: email
      }

      const result = await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          templateParams,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )

      if (result.status === 200) {
          setSubmitStatus({
              type: 'success',
              message: '✓ Message sent successfully! Thank you for reaching out.'
          })
          form.reset()
      } else {
          throw new Error('Failed to send email')
      }
  } catch (error) {
      console.error('Email error:', error)
      setSubmitStatus({
          type: 'error',
          message: '❌ Failed to send message. Please try again later.'
      })
  }
}