interface ITbodyProps{
    children: React.ReactNode
}

const Tbody: React.FC<ITbodyProps> = ({children}) => {
  return (
    <tbody className="w-full">
        {children}
    </tbody>
  )
}

export default Tbody