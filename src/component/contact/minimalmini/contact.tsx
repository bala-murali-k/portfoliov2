import { useState } from 'react';
import type { FormEvent } from 'react';
import { getContactContent } from '@content/contact';
import { useStyle } from '@context/global/style-context';
import Hero from './hero/hero';
import Channels from './channels/channels';
import Form, { type ContactFormValues } from './form/form';

/**
 * Minimal Mini Contact Page:
 * Mobile-first vertical scroll view with desktop minimal sections and generous breathing room.
 */
export default function MinimalMiniContact() {
  const { styleId } = useStyle();
  const contactContent = getContactContent(styleId);

  const [values, setValues] = useState<ContactFormValues>({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(field: keyof ContactFormValues, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    console.log('Contact form submitted (local only):', values);
    setSubmitted(true);
  }

  return (
    <div data-component="minimalmini-contact">
      <section data-component="contact-section-1">
        <Hero header={contactContent.header} />
      </section>
      <section data-component="contact-section-2">
        <Channels channels={contactContent.channels} />
      </section>
      <section data-component="contact-section-3">
        <Form
          values={values}
          labels={contactContent.labels}
          submitted={submitted}
          successMessage={contactContent.successMessage}
          onChange={handleChange}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  );
}
