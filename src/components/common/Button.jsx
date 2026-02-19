const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  disabled = false,
  fullWidth = false,
  type = 'button',
  className = '',
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium tracking-widest uppercase text-xs transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-black text-white hover:bg-gold-500 hover:text-black',
    outline: 'border border-black text-black hover:bg-black hover:text-white',
    gold: 'bg-gold-500 text-black hover:bg-gold-600',
    ghost: 'text-black hover:text-gold-500',
    danger: 'bg-red-600 text-white hover:bg-red-700',
    white: 'bg-white text-black hover:bg-gold-500 hover:text-black',
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3',
    lg: 'px-10 py-4',
    xl: 'px-12 py-5 text-sm',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`
        ${baseStyles}
        ${variants[variant]}
        ${sizes[size]}
        ${fullWidth ? 'w-full' : ''}
        ${className}
      `}
    >
      {children}
    </button>
  );
};

export default Button;
