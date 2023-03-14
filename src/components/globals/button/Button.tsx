import Link from 'next/link';

type Props = {
  label: string;
  action?: () => void | Promise<boolean> | Promise<void>;
  variant: 'black-outlined' | 'green-outlined' | 'black-fill' | 'green-fill';
  classes?: string;
  type?: 'submit';
  disabled?: boolean;
  tabindex?: number;
  linkUrl?: string;
  _blank?: boolean;
  fullWidth?: boolean;
};

enum ButtonVariants {
  blackOutlined = 'black-outlined',
  greenOutlined = 'green-outlined',
  blackFill = 'black-fill',
  greenFill = 'green-fill'
}

const outlineStyles = 'bg-white hover:text-white p-2 px-4';
const fillStyles = 'text-white hover:bg-white p-2 px-4';

const buttonVariants = {
  [ButtonVariants.blackOutlined]: `border-black text-black hover:bg-black ${outlineStyles}`,
  [ButtonVariants.greenOutlined]: `border-green text-green hover:bg-green ${outlineStyles} `,
  [ButtonVariants.blackFill]: `bg-black border-black hover:text-black ${fillStyles}`,
  [ButtonVariants.greenFill]: `bg-green border-green hover:text-green ${fillStyles}`
};

const baseStyles =
  'font-quicksand border focus:outline-none focus:ring-2 focus:ring-offset-1 inline-block text-center font-bold transition-all duration-200 ease-in-out';

const disabledStyles = 'opacity-70 pointer-events-none';

const Button = ({
  label,
  action,
  variant,
  classes,
  type,
  disabled,
  tabindex,
  linkUrl,
  _blank,
  fullWidth
}: Props) => {
  if (linkUrl) {
    return (
      <Link href={linkUrl}>
        <a
          aria-label={`Redirect to ${linkUrl}`}
          className={`${baseStyles} ${buttonVariants[variant]} ${fullWidth ? 'w-full' : ''} ${
            disabled ? disabledStyles : ''
          } ${classes ? classes : ''}`}
          tabIndex={tabindex ? tabindex : 0}
          target={`${_blank ? '_blank' : ''}`}
          rel="noreferrer noopener"
        >
          {label}
        </a>
      </Link>
    );
  }

  return (
    <button
      aria-label={label}
      onClick={action}
      type={type ? type : 'button'}
      className={`${baseStyles} ${buttonVariants[variant]} ${fullWidth ? 'w-full' : ''} ${
        disabled ? disabledStyles : ''
      } ${classes ? classes : ''}`}
      disabled={disabled}
      tabIndex={tabindex ? tabindex : 0}
    >
      {label}
    </button>
  );
};

export default Button;
