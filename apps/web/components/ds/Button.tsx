import Link from 'next/link';
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

type CommonButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
};

type LinkButtonProps = CommonButtonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type NativeButtonProps = CommonButtonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: never;
  };

function getClassName({ variant, size, fullWidth, className }: Required<Pick<CommonButtonProps, 'variant' | 'size'>> & Pick<CommonButtonProps, 'fullWidth' | 'className'>) {
  return ['ca-button', `ca-button--${variant}`, `ca-button--${size}`, fullWidth ? 'ca-button--full' : '', className ?? '']
    .filter(Boolean)
    .join(' ');
}

export function Button(props: LinkButtonProps | NativeButtonProps) {
  const { children, variant = 'primary', size = 'md', fullWidth = false, className, ...rest } = props;
  const computedClassName = getClassName({ variant, size, fullWidth, className });

  if ('href' in rest && rest.href) {
    const { href, ...anchorProps } = rest;
    return (
      <Link className={computedClassName} href={href} {...anchorProps}>
        {children}
      </Link>
    );
  }

  return (
    <button className={computedClassName} type="button" {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {children}
    </button>
  );
}
