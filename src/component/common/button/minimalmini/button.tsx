import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

export default function MinimalMiniButton({ children, ...rest }: ButtonProps) {
  return <button {...rest}>{children}</button>;
}

