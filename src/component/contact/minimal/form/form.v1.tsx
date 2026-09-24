import { useState, useEffect } from 'react';
import type { FormEvent } from 'react';
import { CheckCircle2, AlertCircle, X } from 'lucide-react';
import type { ContactData } from '@content/contact/contact.content';

export interface ContactFormValues {
  name: string;
  email: string;
  message: string;
}

export interface SnackbarState {
  type: string;
  message: string;
}

export interface FormProps {
  values: ContactFormValues;
  labels: ContactData['labels'];
  onChange: (field: keyof ContactFormValues, value: string) => void;
  onSubmit: (e: FormEvent) => void;
  submitStatus?: SnackbarState;
}

export default function FormV1({ values, labels, onChange, onSubmit, submitStatus }: FormProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (submitStatus?.message) {
      setIsOpen(true);
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      setIsOpen(false);
    }
  }, [submitStatus]);

  const isSuccess = submitStatus?.type === 'success';

  return (
    <div data-component="contact-form">
      <form onSubmit={onSubmit}>
        <div data-input-group>
          <label htmlFor="form-name">{labels.name}</label>
          <input
            id="form-name"
            type="text"
            value={values.name}
            onChange={(e) => onChange('name', e.target.value)}
            placeholder="John Doe"
            required
          />
        </div>

        <div data-input-group>
          <label htmlFor="form-email">{labels.email}</label>
          <input
            id="form-email"
            type="email"
            value={values.email}
            onChange={(e) => onChange('email', e.target.value)}
            placeholder="hello@example.com"
            required
          />
        </div>

        <div data-input-group>
          <label htmlFor="form-message">{labels.message}</label>
          <textarea
            id="form-message"
            value={values.message}
            onChange={(e) => onChange('message', e.target.value)}
            placeholder="Tell me about your project..."
            rows={4}
            required
          />
        </div>

        <button type="submit" data-submit-btn>
          {labels.submit} <span data-arrow>↗</span>
        </button>
      </form>

      {submitStatus?.message && (
        <div
          data-snackbar
          data-type={submitStatus.type}
          data-visible={isOpen ? 'true' : 'false'}
          role={isSuccess ? 'status' : 'alert'}
          aria-live={isSuccess ? 'polite' : 'assertive'}
        >
          <div data-snackbar-content>
            <span data-snackbar-icon aria-hidden="true">
              {isSuccess ? (
                <CheckCircle2 size={18} />
              ) : (
                <AlertCircle size={18} />
              )}
            </span>
            <span data-snackbar-message>{submitStatus.message}</span>
          </div>
          <button
            type="button"
            data-snackbar-close
            onClick={() => setIsOpen(false)}
            aria-label="Close notification"
          >
            <X size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
