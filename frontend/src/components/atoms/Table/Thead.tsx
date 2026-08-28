interface ITheadProps{
    children: React.ReactNode
}

const Thead: React.FC<ITheadProps> = ({children}) => {
  return (
    <thead className="w-full">
        {children}
    </thead>
  )
}

export default Thead