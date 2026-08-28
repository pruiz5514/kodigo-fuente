interface FormProps{
    children: React.ReactNode;
    onSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
}

const Form : React.FC<FormProps> = ({children, onSubmit}) => {
  return (
    <form onSubmit={onSubmit} className="w-full">
        {children}
    </form>
  )
}

export default Form