import { ButtonHTMLAttributes } from "react";

import '../styles/button.scss';
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  isOutlined?: boolean;
}

export function Button({ children, isOutlined = false, ...props }: ButtonProps) {
  return (
    <>
      <button
        className={`button ${isOutlined && 'outlined'}`}
        type="button"
        {...props}>
        {children}
      </button>
    </>
  );
}

