interface ButtonProps {
  label: string;
  variant?: 'primary' | 'secondary';
  type?: 'button' | 'submit';
  onClick?: () => void;
}

const Button = ({ label, variant = 'secondary', type = 'button', onClick }: ButtonProps) => {
  const styles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700',
    secondary: 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`font-medium px-5 py-2.5 rounded-2xl transition-colors duration-200 ${styles[variant]}`}
    >
      {label}
    </button>
  );
};

export default Button;