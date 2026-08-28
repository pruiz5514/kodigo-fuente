interface IThProps{
    children: React.ReactNode
}

const Th: React.FC<IThProps> = ({children}) => {
  return (
    <th className="py-5 px-[15px]  text-base font-bold text-left" >
        {children}
    </th>
  )
}

export default Th